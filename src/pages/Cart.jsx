import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import CartItemRow from "../components/Cart/CartItemRow";
import "../styles.css";
class Cart extends Component {
  render() {
    return (
      <Container className="cart-item-list-container">
        <Row className="cart-item-list-row">
          <Col lg={7} className="cart-item-list-col">
            <div className="cart-item-list">
              {Object.keys(this.props.userCart.cartItemData).map((key) => {
                return (
                  <CartItemRow
                    itemId={key}
                    Title={this.props.userCart.cartItemData[key].Title}
                    href={this.props.userCart.cartItemData[key].href}
                    price={this.props.userCart.cartItemData[key].itemPrice}
                    quantity={this.props.userCart.itemMap[key]}
                    addToCart={this.props.addToCart}
                    removeFromCart={this.props.removeFromCart}
                    itemMap={this.props.userCart.itemMap}
                  />
                );
              })}
            </div>
          </Col>
          <Col lg={5}>
            <div className="total-cost-div">
              <h3>Total Sum :-</h3>
              <h4>{this.props.userCart.totalCost}</h4>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userCart: state.userCart
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => {
      dispatch({ type: "ADD_TO_CART", payLoad: item });
    },
    removeFromCart: (item) => {
      dispatch({ type: "REMOVE_FROM_CART", payLoad: item });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
