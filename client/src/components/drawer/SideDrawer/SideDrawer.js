import React from 'react'
import './SideDrawer.css'




export default function SideDrawer(props) {
  let drawerClasses = 'side-drawer'
  if (props.show) {
    drawerClasses = 'side-drawer open'
  }
    return (
        <nav className={drawerClasses}>
          <ul>
            <li>
              <a href="/">SIGN UP</a>
            </li>
            <li>
              <a href="/">USER NAME</a>
            </li>
            <li>
              <a href="/">LOG OUT</a>
            </li>
          </ul>
        </nav>
    )
}

