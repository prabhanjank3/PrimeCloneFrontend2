import React, { useState } from "react";
import "../../prime.css";
import { Container, Row, Col } from "react-bootstrap";
import { updateObject } from "../../utility/utility";

export default props => {
  const [state, setState] = useState({ code: "" });

  const handleInputChange = e => {
    setState(updateObject(state, { code: e.target.value }));
  };
  const handlePromoSubmit = e => {
    e.preventDefault();
    props.handlePromoSubmit(state.code);
  };
  return (
    <form className="promo-form" onSubmit={handlePromoSubmit}>
      <div className="form-group" style={{ float: "left" }}>
        <input
          className="input"
          onChange={handleInputChange}
          type="text"
          placeholder="Promocode"
        />
      </div>

      <div className="form-group promo-apply-btn-div">
        <button className="btn promo-apply-btn" type="submit">
          Apply
        </button>
      </div>
    </form>
  );
};
