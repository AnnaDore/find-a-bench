import React from "react";
import DrawerToggleButton from  '../SideDrawer/DrawerToggleButton'
import "./Toolbar.css";

export default function Toolbar(props) {
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
          <ul>
            <li>
              <a href="/signup">SIGN UP</a>
            </li>
            <li>
              <a href="/login">USER NAME</a>
            </li>
            <li>
              <a href="/logout">LOG OUT</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
