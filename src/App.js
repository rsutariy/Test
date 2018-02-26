import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import './App.css';
import Home from './home/Home';
import Prize from './prize/Listofprizes';

class App extends Component {
  render() {

    return (

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/prizes" component={Prize} />
        </Switch>
      </BrowserRouter>


    );
  }
}

export default App;
