import React from 'react'
import './SideDrawer.css'

export default function SideDrawer(props) {
    return (
        <nav className="side-drawer">
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
