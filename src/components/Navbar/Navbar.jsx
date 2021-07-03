import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProfileTab from "./ProfileTab";
import "../../navbar.css";
import { FaPlay, FaCartPlus } from "react-icons/fa";
export default (props) => {
  console.log(props);
  var location = useLocation();
  return (
    <Navbar bg="dark" variant="dark" className="navbar-container">
      <Navbar.Brand href="#home" className="navbar-brand">
        <Link to="/" className="brand-link">
          MovieZon{" "}
          <span className="prime-logo">
            {props.authData.isPrimeMember ? " Prime" : <></>}
          </span>
        </Link>
      </Navbar.Brand>
      <Nav className="mr-auto" />
      <Form inline>
        {!props.authData.isLoggedIn ? (
          <Link
            to={{
              pathname: "/login",
              lastroute: location.pathname
            }}
          >
            <Button className="login-btn" variant="outline-info">
              Login
            </Button>
          </Link>
        ) : (
          <>
            <Link
              to={{
                pathname: "/cart",
                lastroute: location.pathname
              }}
            >
              <Button className="cart-btn" variant="outline-info">
                <FaCartPlus />
              </Button>
            </Link>
            <ProfileTab
              userName={props.authData.firstName}
              logOutClickHandler={props.logOutClickHandler}
            />
          </>
        )}
      </Form>
    </Navbar>
  );
};
