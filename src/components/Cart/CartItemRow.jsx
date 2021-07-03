import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./CartItemRow.css";
import AddToCartButton from "./AddToCartButton";
export default (props) => {
  console.log(props);
  const addToCart = () => {
    props.addToCart({
      itemId: props.itemId,
      itemPrice: props.price,
      itemData: {
        Title: props.Title,
        href: props.href,
        itemPrice: props.price
      }
    });
  };
  const removeFromCart = () => {
    props.removeFromCart({
      itemId: props.itemId,
      itemPrice: props.price
    });
  };
  return (
    <Container>
      <Row>
        <Col sm={2}>
          <img className="cart-item-image" src={props.href} alt={props.Title} />
        </Col>
        <Col sm={3} className="cart-item-row">
          <div className="cart-item-row-content">{props.Title}</div>
        </Col>
        <Col sm={2} className="cart-item-row">
          <div className="cart-item-row-content">{props.price}</div>
        </Col>
        <Col sm={1} className="cart-item-row">
          <div className="cart-item-row-content">{props.quantity}</div>
        </Col>
        <Col sm={4}>
          <AddToCartButton
            itemId={props.itemId}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            itemMap={props.itemMap}
          />
        </Col>
      </Row>
    </Container>
  );
};
