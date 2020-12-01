import React from 'react'
import './SideDrawer.css'
import ListOfBtns from '../listOfButtons/ListOfBtns'


export default function SideDrawer(props) {
  let drawerClasses = 'side-drawer'
  
  if (props.show) {
    drawerClasses = 'side-drawer open'
  }
 
  console.log(props, "sideDrawer")
    return (
        <nav className={drawerClasses}>
         <ListOfBtns user={props.user}/>
        </nav>
    )
}

