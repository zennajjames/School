import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { Container, Input, Button } from 'mdbreact';

class SignupForm extends Component {
  
  state = {
    username: "",
    password: "",
    fname: "",
    lanme: "",
    email: "",
    confirmPassword: "",
    redirectTo: null, 
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // TODO - validate!
    axios
      .post("/auth/signup", {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        fname: this.state.fname,
        lname: this.state.lname
      })
      .then(response => {
				let email = response.data.local.email;
				let password = this.state.password;
				console.log("Signed up:"+email+" "+this.state.password)
        if (!response.data.errmsg) {
          console.log("User registered! Logging in..."+email,password);
					this.props.login(email, password);
						if (response.status === 200) {
						this.setState({
							redirectTo: "/dashboard"
						});
						} else {
							console.log("Sign up failed.");
						}
					}
      });
  }

  render() {
    if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<Container className="SignupForm">
				<h1>Sign Up</h1>
        <label htmlFor="fname">First Name: </label>
				<Input
					type="text"
					name="fname"
					value={this.state.fname}
					onChange={this.handleChange}
				/>
        <label htmlFor="lname">Last Name: </label>
				<Input
					type="text"
					name="lname"
					value={this.state.lname}
					onChange={this.handleChange}
				/>
        <label htmlFor="email">Email: </label>
				<Input
					type="text"
					name="email"
					value={this.state.email}
					onChange={this.handleChange}
				/>
				<label htmlFor="username">Username: Optional</label>
				<Input
					type="text"
					name="username"
					value={this.state.username}
					onChange={this.handleChange}
				/>
				<label htmlFor="password">Password: </label>
				<Input
					type="password"
					name="password"
					value={this.state.password}
					onChange={this.handleChange}
				/>
				<label htmlFor="confirmPassword">Confirm Password: </label>
				<Input
					type="password"
					name="confirmPassword"
					value={this.state.confirmPassword}
					onChange={this.handleChange}
				/>
				<Button onClick={this.handleSubmit}>Sign Up</Button>
			</Container>
		)
	}
}

export default SignupForm;