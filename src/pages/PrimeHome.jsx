import React, { Component } from "react";
import PrimeHome from "../components/Prime/PrimeHome";
import { connect } from "react-redux";
import { SERVER_URL } from "../properties";
import PrimePlan from "../components/Prime/PrimePlan";
import { Container, Row, Col } from "react-bootstrap";
import "../prime.css";
import axios from "axios";
import Axios from "axios";
import { Redirect } from "react-router";
class Prime extends Component {
  constructor(props) {
    super(props);
    if (!props.hasOwnProperty("lastroute")) {
      props.location.lastroute = "/prime";
    }
  }
  state = { isClickedJoin: false, prime_subscription_trigger: false };

  render() {
    console.log(this.state);
    const joinClickHandler = () => {
      this.setState({
        isClickedJoin: true
      });
    };
    const handlePromoSubmit = code => {
      var FINAL_URL = SERVER_URL + "/promo/" + this.props.userID + "/" + code;
      console.log(FINAL_URL);
      axios.get(FINAL_URL).then(response => {
        console.log(response.data);
        if (response.data.status === 200) {
          this.props.primeDispatch("PRIME_SUBSCRIBED");
          this.setState({
            ...this.state,
            prime_subscription_trigger: true
          });
        }
      });
    };
    return (
      <>
        {this.state.prime_subscription_trigger === true ? (
          <Redirect to={{ pathname: this.props.location.lastroute }} />
        ) : (
          <Container className="prime-page">
            <Row>
              <Col lg={3} />
              <Col lg={6} style={{ textAlign: "Center" }}>
                {!this.state.isClickedJoin ? (
                  <PrimeHome
                    isLoggedIn={this.props.isLoggedIn}
                    location={this.props.location}
                    joinClickHandler={joinClickHandler}
                  />
                ) : (
                  <PrimePlan handlePromoSubmit={handlePromoSubmit} />
                )}
              </Col>
              <Col lg={3} />
            </Row>
          </Container>
        )}
      </>
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
    primeDispatch: actionType => {
      dispatch({ type: actionType });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prime);
