import React from "react";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./Toolbar.css";
import ListOfBtns from "../listOfButtons/ListOfBtns"

export default function Toolbar(props) {
 // console.log(props, "Toolbar");
  return (
    <header className="toolbar">
      <nav className="toolbar-navigation">
        <div>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="toolbar-logo">
          <a href="/">Find a bench!</a>
        </div>
        <div className="space-between" />
        <div className="toolbar-navigation-item">
        <ListOfBtns getMyUser={props.getMyUser} user={props.user}/>
        
        </div>
      </nav>
    </header>
  );
}
