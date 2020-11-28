import React, { Component } from "react";
import Toolbar from "../toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import Backrdrop from "../Backdrop/Backdrop";


export default class FinalDrawer extends Component {
  state = {
    sideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
      this.setState({sideDrawerOpen: false})
  }



  render() {
     let sideDrawer;
    let backdrop;

    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer show={this.state.sideDrawerOpen}/>;
      backdrop = <Backrdrop click={this.backdropClickHandler} />;
    }

    return (
      <div>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        {/* <SideDrawer />; */}
        {sideDrawer}
        {backdrop}
      </div>
    );
  }
}
