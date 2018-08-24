import React, { Component } from 'react';
import API from "../utils/API";
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react';

import Layout from './Layout';

class Signup extends Component {
	constructor() {
		super()
		this.state = {
      fname: '',
      lname: '',
      email: '',
			username: '',
			password: '',
			confirmPassword: '',
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		console.log('User: '+this.state.username+" successfully added.")
    event.preventDefault()

    	//request to server to add a new username/password
		API.saveUser({
			username: this.state.username,
      password: this.state.password,
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('Successful registration.')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log('Username already taken.')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
  }

  render() {
  return (
    <Layout>

      <Form>
        <Form.Field>
          <label>First Name</label>
          <input 
          type="text"
          name="fname"
          value={this.state.fname}
          onChange={this.handleChange}
          placeholder='First Name' />
        </Form.Field>

        <Form.Field>
          <label>Last Name</label>
          <input type="text"
            name="lname"
            value={this.state.lname}
            onChange={this.handleChange}
            placeholder='Last Name' />
        </Form.Field>

           <Form.Field>
          <label>Username</label>
          <input type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder='Username' />
        </Form.Field>

        <Form.Field>
          <label>Email</label>
          <input type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder='Email' />
        </Form.Field>

        <Form.Field>
          <label>Password</label>
          <input 
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder='Password' />
        </Form.Field>
        
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button onClick={this.handleSubmit} type='submit'>Submit</Button>
      </Form>  
       
      <p>
        <Link to="/dynamic">Navigate to Dynamic Page</Link>
      </p>
    </Layout>
  );
}
};

export default Signup;