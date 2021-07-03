import React, { Component } from "react";
import Navbar from "../components/Navbar/Navbar";
import { connect } from "react-redux";

class Nav extends Component {
  logOutClickHandler = () => {
    this.props.logOutDispatcher("LOGOUT_STATE_UPDATE");
  };
  render() {
    return (
      <Navbar
        authData={this.props}
        logOutClickHandler={this.logOutClickHandler}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    firstName: state.firstName,
    isPrimeMember: state.isPrimeMember
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logOutDispatcher: actionType => {
      dispatch({ type: actionType });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
