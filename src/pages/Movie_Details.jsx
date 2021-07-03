import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FaPlay, FaCartPlus } from "react-icons/fa";
import axios from "axios";
import MoviePoster from "../components/Movie_Details/Movie_Poster";
import MovieDescription from "../components/Movie_Details/Movie_Description";
import MovieHeading from "../components/Movie_Details/Movie_Heading";
import MovieInfo from "../components/Movie_Details/Movie_Info";
import Loading from "./Loading";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "./Authentication";
import Navbar from "../components/Navbar/Navbar";
import "../styles.css";
import AddToCartButton from "../components/Cart/AddToCartButton";
import { SERVER_URL } from "../properties";
class Movie_Details extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      movie_details: {}
    };
  }
  addToCart = () => {
    this.props.addToCart({
      itemId: this.state.movie_details.imdbID,
      itemPrice: this.state.movie_details.price,
      itemData: {
        Title: this.state.movie_details.Title,
        href: this.state.movie_details.Poster,
        itemPrice: this.state.movie_details.price
      }
    });
  };
  removeFromCart = () => {
    this.props.removeFromCart({
      itemId: this.state.movie_details.imdbID,
      itemPrice: this.state.movie_details.price
    });
  };
  render() {
    return this.props.isLoggedIn ? (
      this.state.isLoaded ? (
        <Container>
          <Row className="movie-heading-row">
            <Col>
              <MovieHeading heading={this.state.movie_details.Title} />
            </Col>
          </Row>
          <Row>
            <Col className="col" lg={3} md={12} sm={12} xs={12}>
              <MoviePoster href={this.state.movie_details.Poster} />
            </Col>
            <Col className="description-col">
              <MovieInfo
                imdbRating={this.state.movie_details.imdbRating}
                runTime={this.state.movie_details.Runtime}
                released={this.state.movie_details.Released}
              />
              <MovieDescription
                plot={this.state.movie_details.Plot}
                director={this.state.movie_details.Director}
                starring={this.state.movie_details.Actors}
                genre={this.state.movie_details.Genre}
                price={this.state.movie_details.price}
              />
            </Col>
          </Row>
          <Row className="watch-now-row">
            <Col className="col" lg={3} xs={12}>
              <AddToCartButton
                itemId={this.props.match.params.id}
                addToCart={this.addToCart}
                removeFromCart={this.removeFromCart}
                itemMap={this.props.itemMap}
              />
              {this.props.isPrimeMember ? (
                <Button className="watch-now-btn">
                  <FaPlay className="play-btn" />
                  Watch Now
                </Button>
              ) : (
                <Link
                  to={{
                    pathname: "/prime",
                    lastroute: this.props.location.pathname
                  }}
                >
                  <Button className="watch-now-btn">
                    <FaPlay className="play-btn" />
                    Join Prime to Watch Now
                  </Button>
                </Link>
              )}
            </Col>
            <Col />
            <Col />
          </Row>
        </Container>
      ) : (
        <Loading />
      )
    ) : (
      <Redirect
        to={{ pathname: "/login", lastroute: this.props.location.pathname }}
      />
    );
  }
  componentDidMount() {
    const FINAL_URL = SERVER_URL + "/movie/" + this.props.match.params.id;
    axios.get(FINAL_URL).then((response) => {
      console.log(response.data[0]);
      this.setState((prevState) => {
        return {
          ...prevState,
          movie_details: response.data[0],
          isLoaded: true
        };
      });
    });
  }
}
const mapStateToProps = (state) => {
  return {
    home_display: state.home_display,
    home_display_data_loaded: state.home_display_data_loaded,
    isLoggedIn: state.isLoggedIn,
    isPrimeMember: state.isPrimeMember,
    itemMap: state.userCart.itemMap
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
export default connect(mapStateToProps, mapDispatchToProps)(Movie_Details);
