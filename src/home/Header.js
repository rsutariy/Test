import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let body = (
      <div className="row">
        <div className="col-md-8 col-sm-8 col-xs-8">
          <div className="row">
            <button type="button" className="col btn btn-secondary">
              Battle
            </button>
            <button type="button" className="col btn btn-secondary">
              Prizes &and; Ranks
            </button>
            <button type="button" className="col btn btn-secondary">
              Rewards
            </button>
            <button type="button" className="col btn btn-secondary">
              Armoury
            </button>
          </div>
        </div>
      </div>
    );
    return body;
  }
}
export default Header;
