import React, { Component } from 'react'
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import Map from "./components/map/Map";
import Toolbar from "./components/toolbar/Toolbar";


export default class App extends Component {
  render() {
    return (
      <div>

      <Switch>
      <Route exact path="/" component={Map} />

      </Switch>
         
      </div>
    )
  }
}
