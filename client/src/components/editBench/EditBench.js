import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import BenchService from "../../services/benchService";

export default class EditBench extends Component {
  state = {
    id: this.props.match.params.id,
    bench: null,
    description: "",
    imageUrl: "",
    location: {lat: null, lng: null}
  };

  allBenches = new BenchService();

  giveMeBench = () => {
    console.log("did mount");
    console.log(this.props.match.params.id);
    this.allBenches
      .oneBenchGet(this.props.match.params.id)
      .then((data) => {
        console.log(data);
        this.setState({
          bench: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFileUpload = (e) => {
    //e.target.files[0]
    console.log(e.target.files[0]);
    const uploadData = new FormData();
    console.log(uploadData);
    uploadData.append("benchAvatar", e.target.files[0]);
    this.allBenches.imageUpload(uploadData);
  };

  componentDidMount = () => {
    this.giveMeBench();
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.allBenches
      .editBench(
        this.state.description,
        this.state.imageUrl,
        this.state.location, 
        this.props.user._id,
        this.state.id
      )
      .then((response) => {
        console.log(response);
        this.setState({
          description: "",
          imageUrl: "",
          location: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    console.log(this.state);
  };

  render() {
     console.log(this.props.user);
     console.log(this.state.bench);
    // console.log(this.props.match.params.id);
    console.log(this.state.description, 'descr')
    console.log(this.state.imageUrl, 'imageUrl')
    console.log(this.state.location, 'loco')
    if (this.state.bench < 1) {
      return <h2>Loading...</h2>;
    }
    return (
      <div>
        {/* <p>{this.state.id}</p> */}
        {/* {this.state.bench.location.map(item => (
             <p>{item.lat}</p>
        )
            
        )} */}
        <h4>Add more information</h4>
        <form onSubmit={this.handleFormSubmit}>
          <label>Latitude is:</label>{" "}
          <input
            name="location"
            placeholder={this.state.bench.location.lat}
            onChange={this.handleChange}
          />
          <label>Langtitue is: </label>{" "}
          <input
            name="location"
            value={this.state.bench.location.lng}
            onChange={this.handleChange}
          />
          <p>Put the description: </p>
          <input
            placeholder="Did you like this bench?"
            name="description"
            value={this.state.bench.description}
            onChange={this.handleChange}
          />
          <br />
          <input
            type="file"
            name="benchAvatar"
            onChange={(e) => this.handleFileUpload(e)}
          />
          <button>Edit bench!</button>
        </form>
      </div>
    );
  }
}
