import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import Map from "./components/map/Map";
import Toolbar from "./components/toolbar/Toolbar";
import SideDrawer from './components/SideDrawer/SideDrawer'

export default class App extends Component {
  render() {
    return (
      <div>
        <Toolbar />
        <SideDrawer />
        <main>
          <Switch>
            <Route exact path="/" component={Map} />
          </Switch>
        </main>
      </div>
    );
  }
}
