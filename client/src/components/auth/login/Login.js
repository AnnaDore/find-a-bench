import { isThisSecond } from "date-fns/esm";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../../services/authService";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    redirect: false,
    errorMsg: "",
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
      .login(this.state.email, this.state.password)
      .then((user) => {
        this.props.getMyUser(user)
       // console.log(user)
        this.setState({
          email: "",
          password: "",
          redirect: true,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          this.setState({
            errorMsg: err.response.data.message,
          });
        } else {
            this.setState({
            errorMsg: "Email is invalid"
          });
        }
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
   // console.log(this.props, "getMyUser from App.js")
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
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
        {this.state.errorMsg}
      </div>
    );
  }
}
