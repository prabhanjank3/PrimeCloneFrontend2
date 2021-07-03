import React from "react";
import { Dropdown } from "react-bootstrap";

export default props => {
  const handleLogoutClick = () => {
    props.logOutClickHandler();
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {props.userName}&nbsp;
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
