import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../../services/authService";

export default class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    redirect: false,
  };

  service = new AuthService();

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.service
      .signup(this.state.username, this.state.email, this.state.password)
      .then((response) => {
        console.log(response);
        this.setState({
          username: "",
          password: "",
          email: "",
          redirect: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
      
    console.log(this.state);
    if (this.state.redirect) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Put your email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Put your passport"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button>Sign up</button>
        </form>
       <p> Already have an account? <a href="/login">Login</a></p>
      </div>
    );
  }
}
