import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Prize from "./Listofprizes";

class Prize extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;

    return (
      <Switch>
        
        <Route path="/:" component={Prize} />
      </Switch>
    );
  }
}

export default Prize;