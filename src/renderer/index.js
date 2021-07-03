import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import reducer from "../store/reducer";
import { Provider } from "react-redux";
import Index from "../pages/Index";
import Navbar from "../pages/Navbar";
import PrimeHome from "../pages/PrimeHome";
import MovieDetails from "../pages/Movie_Details";
import Authentication from "../pages/Authentication";
import Authentication_SignUp from "../pages/Authentication_Signup";
import Cart from "../pages/Cart";
const rootElement = document.getElementById("root");
const store = createStore(reducer);
const routing = (
  <Router>
    <Provider store={store}>
      <Navbar />
      <Route exact path="/" component={Index} />
      <Route exact path="/prime" component={PrimeHome} />
      <Route path="/login" component={Authentication} />
      <Route path="/signup" component={Authentication_SignUp} />
      <Route path="/movie/:id" component={MovieDetails} />
      <Route path="/cart" component={Cart} />
    </Provider>
  </Router>
);
ReactDOM.render(routing, rootElement);
