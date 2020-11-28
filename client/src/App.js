import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import Map from "./components/map/Map";
import FinalDrawer from "./components/drawer/finalDrawer/FinalDrawer";
import Signup from './components/auth/signup/Signup'


export default class App extends Component {
  render() {
    return (
      <div>
        <FinalDrawer />
       
        <main>
          <Switch>
            <Route exact path="/" component={Map} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </main>
      </div>
    );
  }
}
