import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default props => {
  console.log(props);
  return (
    <section>
      <h2>Enjoy Free Videos, Music, Gaming & More </h2>
      {props.isLoggedIn ? (
        <Button onClick={props.joinClickHandler}>Join Prime Now</Button>
      ) : (
        <Link to={{ pathname: "/login", lastroute: props.location.pathname }}>
          <Button>Login to Join Prime</Button>
        </Link>
      )}
    </section>
  );
};
