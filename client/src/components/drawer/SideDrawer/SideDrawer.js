import React from 'react'
import './SideDrawer.css'


export default function SideDrawer(props) {
  let drawerClasses = 'side-drawer'
  let btnsLoggedInOut;
  if (props.show) {
    drawerClasses = 'side-drawer open'
  }
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
    btnsLoggedInOut = ( <ul>
      <li>
        <a href="/signup">SIGN UP</a>
      </li>
    </ul>)
  }
  console.log(props, "sideDrawer")
    return (
        <nav className={drawerClasses}>
         {btnsLoggedInOut}
        </nav>
    )
}

