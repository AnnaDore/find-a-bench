import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import BenchService from "../../services/benchService";

export default class EditBench extends Component {
  state = {
    id: this.props.match.params.id,
    bench: null,
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
    console.log(e.target.files[0])
    const uploadData = new FormData();
    console.log(uploadData)
    uploadData.append("benchAvatar", e.target.files[0]);
    this.allBenches.imageUpload(uploadData);
  };

  componentDidMount = () => {
    this.giveMeBench();
  };

  render() {
    // console.log(this.props);
    // console.log(this.state.bench);
    // console.log(this.props.match.params.id);
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
        <p>Latitude is:</p> <input value={this.state.bench.location.lat} />
        <p>Langtitue is: </p> <input value={this.state.bench.location.lat} />
        <p>Put the description: </p>
        <input
          placeholder="Did you like this bench?"
          value={this.state.bench.description}
        />
        <br/>
         <input
            type="file"
            name="benchAvatar"
            onChange={(e) => this.handleFileUpload(e)}
          />
        
      </div>
    );
  }
}

