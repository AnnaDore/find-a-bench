import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "./services/authService";
import Map from "./components/map/Map";
import FinalDrawer from "./components/drawer/finalDrawer/FinalDrawer";
import Signup from "./components/auth/signup/Signup";
import Login from "./components/auth/login/Login";

export default class App extends Component {
  state = {
    loggedInUser: null,
  };

  service = new AuthService();

  getTheUser = (user) => {
    this.setState({
      loggedInUser: user,
    });
  };

  render() {
    console.log(this.state, "App.js")
    return (
      <div>
     
        <FinalDrawer user={this.state.loggedInUser}/>
      
        <main>
          <Switch>
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
