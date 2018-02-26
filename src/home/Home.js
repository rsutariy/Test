import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Header from "./Header";
import Tiles from "./Tiles";
class Home extends Component {
  render() {
    let body = (
      <div className="home">
        <div className="header">
          <Header />
        </div>
        <div className="tiles">
          <Tiles />
        </div>
      </div>
    );
    return body;
  }
}

export default Home;
