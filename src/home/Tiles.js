import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";

class Tiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: []
    };
    this.getTiles = this.getTiles.bind(this);
  }

  componentWillMount() {
    //this.getTiles();
  }

  async getTiles() {
    let response = await axiosInstance.get("/tiles.json");
    console.log(response);
    this.setState({
      tiles: response.data
    });
  }

  render() {
    // let structures = [
    //   {
    //     name: "Structure one",
    //     slug: "One",
    //     blurb: "This is structure one blurb"
    //   },
    //   {
    //     name: "Structure Two",
    //     slug: "Two",
    //     blurb: "This is structure two blurb"
    //   },
    //   {
    //     name: "Structure Two",
    //     slug: "Two",
    //     blurb: "This is structure two blurb"
    //   },
    //   {
    //     name: "Structure Two",
    //     slug: "Two",
    //     blurb: "This is structure two blurb"
    //   },
    //   {
    //     name: "Structure Two",
    //     slug: "Two",
    //     blurb: "This is structure two blurb"
    //   }
    // ];

    //structures = [];
    let body = (
      <div className="scrolling-wrapper">
        <div className="card text-center">
          <span class="notify-badge">50%</span>
          <img
            className="card-img-top"
            src="https://static.pexels.com/photos/7919/pexels-photo.jpg"
            alt="Card image cap"
          />
          <div className="card-block">
            <h4 className="card-title ">Card title</h4>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
    return body;
  }
}
export default Tiles;
