import React, { Component } from "react";
import { Container, Input, Button } from 'mdbreact';
import {create} from './api-user.js'

class SignupForm extends Component {
  
  state = {
		name: '',
		password: '',
		email: '',
		open: false,
		error: ''
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  handleSubmit = () => {
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
		}
		console.log("New user: "+user)
    create(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({error: '', open: true})
      }
    })
  }

  render() {
		return (
			<Container className="SignupForm">
				<h1>Sign Up</h1>
        <label htmlFor="name">Name: </label>
				<Input
					type="text"
					name="name"
					size = "sm"
					value={this.state.name}
					onChange={this.handleChange('name')}
				/>
        <label htmlFor="email">Email: </label>
				<Input
					type="text"
					name="email"
					size = "sm"
					value={this.state.email}
					onChange={this.handleChange('email')}
				/>
				<label htmlFor="password">Password: </label>
				<Input
					type="password"
					name="password"
					size = "sm"
					value={this.state.password}
					onChange={this.handleChange('password')} 
				/>
				<Button onClick={this.handleSubmit}>Sign Up</Button>
			</Container>
		)
	}
}

export default SignupForm;