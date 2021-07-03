import React, { Component } from "react";
import "../login.css";
import axios from "axios";
import Properties from "../properties";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { updateObject } from "../utility/utility";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import LoginForm from "../components/Authentication/Login_Form";

class Login extends Component {
  constructor(props) {
    super(props);
    if (!this.props.location.hasOwnProperty("lastroute")) {
      this.props.location.lastroute = "/";
    }
  }
  state = { isAuthFailure: false, failureMsg: "", waitingForResponse: false };

  createQueryString = creadentials => {
    return (
      Properties.SERVER_URL +
      "/signin/?username=" +
      creadentials.username +
      "&password=" +
      creadentials.password
    );
  };

  getAuthActionType = response => {
    switch (response.status) {
      case 200:
        return "AUTH_SUCCESS";
      case 404:
        this.setState(prevState =>
          updateObject(this.state, {
            isAuthFailure: true,
            failureMsg: "User Not Found"
          })
        );

        break;
      case 405:
        this.setState(prevState =>
          updateObject(this.state, {
            isAuthFailure: true,
            failureMsg: "Invalid Credentials"
          })
        );
        break;
      default:
        return "AUTH_FAILURE_DEFAULT";
    }
  };
  handleOnSubmit = credentials => {
    this.setState({
      ...this.state,
      waitingForResponse: true
    });
    axios.get(this.createQueryString(credentials)).then(response => {
      console.log(response.data);
      var actionType = this.getAuthActionType(response.data);
      if (actionType === "AUTH_SUCCESS")
        this.props.authDispathch(actionType, response.data);
      this.setState({
        ...this.state,
        waitingForResponse: false
      });
    });
  };

  render() {
    console.log("In Login");
    console.log(this.props);
    return !this.props.isLoggedIn ? (
      this.state.waitingForResponse ? (
        <Loading />
      ) : (
        <Container>
          <Row>
            <Col lg={3} />
            <Col style={{ textAlign: "center" }} lg={6}>
              <LoginForm
                handleOnSubmit={this.handleOnSubmit}
                isLoggedIn={this.props.isLoggedIn}
              />

              <h5 style={{ textAlign: "center" }}>{this.state.failureMsg}</h5>
              <Link to="/signup">Create New Account</Link>
            </Col>
            <Col lg={3} />
          </Row>
        </Container>
      )
    ) : (
      <Redirect to={this.props.location.lastroute} />
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    userID: state.userID
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authDispathch: (actionType, obj) => {
      dispatch({ type: actionType, payLoad: obj });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
