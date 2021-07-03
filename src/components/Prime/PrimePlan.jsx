import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PromoForm from "./PromoForm";
import "../../prime.css";
export default props => {
  var [state, setState] = useState({ isPromoChecked: false });
  const promoClickHandler = () => {
    setState({
      isPromoChecked: true
    });
  };
  return (
    <section>
      <Container>
        <Row>
          <Col>
            <h3>Choose Your Prime Plan</h3>
            <Form>
              {["radio"].map(type => (
                <div key={`inline-${type}`} className="mb-3 plan-section">
                  <Row className="plan-item-row">
                    <Col lg={12}>
                      <Form.Check
                        style={{ textAlign: "left" }}
                        label="Have a Promocode"
                        type={type}
                        id={`inline-${type}-1`}
                        onClick={promoClickHandler}
                      />
                    </Col>
                    {state.isPromoChecked ? (
                      <PromoForm handlePromoSubmit={props.handlePromoSubmit} />
                    ) : (
                      <></>
                    )}
                  </Row>
                  <Row className="plan-item-row">
                    <Col lg={12}>
                      <Form.Check
                        style={{ textAlign: "left" }}
                        label="Try Free Trial"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                    </Col>
                  </Row>
                  <Row className="plan-item-row">
                    <Col lg={12}>
                      <Form.Check
                        style={{ textAlign: "left" }}
                        label="Join Prime for 999/Year"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                    </Col>
                  </Row>
                </div>
              ))}
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
