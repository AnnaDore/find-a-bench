import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "./services/authService";
import Map from "./components/map/Map";
import FinalDrawer from "./components/drawer/finalDrawer/FinalDrawer";
import Signup from './components/auth/signup/Signup'
import Login from './components/auth/login/Login'


export default class App extends Component {

  service = new AuthService();

  render() {
    return (
      <div>
        <FinalDrawer />
       
        <main>
          <Switch>
            <Route exact path="/" component={Map} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" render={() => <Login getMyUser={this.getTheUser} />} />
          </Switch>
        </main>
      </div>
    );
  }
}
