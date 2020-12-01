import React from "react";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./Toolbar.css";

export default function Toolbar(props) {
  console.log(props, "Toolbar");
  let btnsLoggedInOut;
  if (props.user) {
    btnsLoggedInOut = (
      <ul>
        <li>
          <a href="/login">{props.user.username}</a>
        </li>
        <li>
          <a href="/logout">LOG OUT</a>
        </li>
      </ul>
    );
  } else {
    btnsLoggedInOut = (
    <ul>
      <li>
        <a href="/signup">SIGN UP</a>
      </li>
    </ul>
    )
  }

  return (
    <header className="toolbar">
      <nav className="toolbar-navigation">
        <div>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="toolbar-logo">
          <a href="/">DODO</a>
        </div>
        <div className="space-between" />
        <div className="toolbar-navigation-item">
        {btnsLoggedInOut}
        </div>
      </nav>
    </header>
  );
}
