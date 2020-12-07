import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "./services/authService";
import BenchService from "./services/benchService";
import Map from "./components/map/Map";
import FinalDrawer from "./components/drawer/finalDrawer/FinalDrawer";
import Signup from "./components/auth/signup/Signup";
import Login from "./components/auth/login/Login";

export default class App extends Component {
  state = {
    loggedInUser: null,
    allBenches: null,
  };

  service = new AuthService();
  allBenches = new BenchService();

  checkUserLoggedIn = () => {
    this.service
      .loggedin()
      .then((user) => {
        this.setState({
          loggedInUser: user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getAllBenches = () => {
    this.allBenches
      .allBenches()
      .then((data) => {
        console.log(data[0].location, "all benches react");

        // let benchesArray = []
        // for (let i = 0; i <= data.length; i++) {
        //     benchesArray.push(data[i].location)
        // }
        // console.log(benchesArray, "benchesArray")
        this.setState({
          allBenches: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    // this.service.loggedin()
    // .then(user => {
    //   this.setState({
    //     loggedInUser: user
    //   })
    // })
    // .catch(err => {
    //   console.log(err)
    // })
    this.checkUserLoggedIn();
    this.getAllBenches();
  };

  getTheUser = (user) => {
    console.log(user, "getTheUser app.js");
    this.setState({
      loggedInUser: user,
    });
  };

  render() {
    console.log(this.state, "App.js");
    // if (this.state.bench) {
    //   let locBenches =     this.state.allBenches.map(item => {
    //     return item.location
    //   })
    //   console.log(locBenches)
    //   this.setState({
    //     allBenches: locBenches
    //   })
    // }
    if (this.state.allBenches < 1) {
      return <h2>Loading...</h2>;
    }
    return (
      <div>
        <FinalDrawer
          getMyUser={this.getTheUser}
          user={this.state.loggedInUser}
        />

        <main>
          <Switch>
            {this.state.allBenches.map((item) => {
              //
              // <Route exact path="/" component={Map}  props={item} />
              //  <Route exact path="/" render={(props) => <Map {...props} dodo="dodo" locationsBench={item.location}  /> }  />
              //  <Route exact path="/" render={() => <Map  /> } />
            })}
            <Route exact path="/" component={Map} />
            <Route exact path="/signup" component={Signup} />
            <Route
              exact
              path="/login"
              render={() => <Login getMyUser={this.getTheUser} />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}
