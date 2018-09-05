import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import { Container, Input, Button } from 'mdbreact';

class SignupForm extends Component {
  
  state = {
		fname: "",
    lname: "",
    email: "",
    password: "",
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
        username: this.state.email,
        password: this.state.password,
        email: this.state.email,
        fname: this.state.fname,
        lname: this.state.lname
      })
      .then(response => {
				console.log("Success! Welcome "+response.data.fname)
        if (!response.data.errmsg) {
          console.log("User registered! Logging in...");
					this.props.login(this.state.email, this.state.password);
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