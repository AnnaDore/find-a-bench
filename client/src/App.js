import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "./services/authService";
import BenchService from "./services/benchService";
import Map from "./components/map/Map";
import FinalDrawer from "./components/drawer/finalDrawer/FinalDrawer";
import Signup from "./components/auth/signup/Signup";
import Login from "./components/auth/login/Login";
import Profile from "../src/components/profile/Profile";
import EditBench from "./components/editBench/EditBench";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Test from "./components/Test"

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
        // console.log(data[0].location, "all benches react");
        //  console.log(data);

        this.setState({
          allBenches: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
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
    //   console.log(this.state, "App.js");
    //   console.log(this.state.allBenches)

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
            <Route exact path="/signup" component={Signup} />
            <Route
              exact
              path="/login"
              render={() => <Login getMyUser={this.getTheUser} />}
            />
            <Route
              exact
              path="/"
              render={() => <Map benches={this.state.allBenches} />}
            />
            {/* <Route
              exact
              path="/profile/:id"
              render={() => (
                <Profile
                  getMyUser={this.getTheUser}
                  user={this.state.loggedInUser}
                />
              )}
            /> */}
            <ProtectedRoute
              path="/profile/:id"
              component={Profile}
              getMyUser={this.getTheUser}
              user={this.state.loggedInUser}
              test={"test"}
            />
            <ProtectedRoute
              path="/protected/test"
              component={Test}
              getMyUser={this.getTheUser}
              user={this.state.loggedInUser}
              test={"test"}
            />
            <Route
              exact
              path="/bench/:id"
              render={(props) => (
                <EditBench {...props} user={this.state.loggedInUser} />
              )}
            />
          </Switch>
        </main>
      </div>
    );
  }
}
