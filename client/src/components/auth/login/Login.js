import { isThisSecond } from "date-fns/esm";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../../services/authService";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    redirect: false,
  };

  service = new AuthService();

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ 
        [name]: value
    })
   // console.log(this.state)
  };

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.service.login(this.state.email, this.state.password)
    .then(response => {
        console.log(response)
        this.setState({
            email: "",
            password: "", 
            redirect: true
        })
    })
    .catch(err => {
        console.log(err)
    })
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Put your email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
           <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button>Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Signup</a></p>
      </div>
    );
  }
}
