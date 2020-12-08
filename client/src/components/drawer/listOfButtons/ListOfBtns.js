import React, { Component } from 'react'
import { Switch, Route, Link, Redirect } from "react-router-dom";
import AuthService from "../../../services/authService";
import Profile from "../../profile/Profile"

export default class ListOfBtns extends Component {
    state = {
        redirect: false
    }
    service = new AuthService()

    logout = () => {
      
      this.service.logout()
      .then(response => {
         console.log(response, 'logout')
         this.props.getMyUser(null)
         this.setState({
             redirect: true
         })
      })
      .catch(err => {
          console.log(err)
      })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/"></Redirect>;
          }

        let btnsLoggedInOut;
        if (this.props.user) {
            btnsLoggedInOut = (
              <ul>
                <li>
                  <Link to={`/profile/${this.props.user._id}`} >{this.props.user.username}</Link>
                </li>
                <li>
                  <p onClick={this.logout}>Logout</p>
                </li>
              </ul>
            );
          } else {
            btnsLoggedInOut = ( <ul>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            </ul>)
          }
    
          console.log(this.props)
        return (
            <div>
                   {btnsLoggedInOut}
            </div>
        )
    }
}

