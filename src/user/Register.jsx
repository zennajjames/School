import React, { Component } from "react";
import { Container, Row, Col, Input, Button, Fa, Card, CardBody } from 'mdbreact';
import Modal from '../core/Modal'

import "../styles/Input.css";


import {create} from './api-user'

const styles = {
  heading: {
    fontWeight: 300
  }
}

class Register extends Component {
  
  state = {
		firstname: '',
		lastname: '',
		password: '',
		email: '',
		modal: false,
		error: '', 
		isUploading: false,
    photo: ''
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
	}

  handleSubmit = () => {
		const defaultPhoto = '/api/users/defaultphoto';
		const fullname = this.state.firstname + ' ' + this.state.lastname;
    const user = {
			firstname: this.state.firstname || undefined,
			lastname: this.state.lastname || undefined,
			name: fullname || undefined,
      email: this.state.email || undefined,
			password: this.state.password || undefined,
		}
		console.log(user)
    create(user).then((data) => {
			console.log(data)
      if (data.error) {
        this.setState({error: data.error})
      } else {
				console.log("Registration successful!")
        this.setState({error: '', modal: !this.state.modal})
      }
    })
	}

  render() {
		const divStyle = {
      width: 400,
      height: 200,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#666',
      borderStyle: 'solid',
      borderRadius: 5
    };

    const activeStyle = {
      opacity: 0.5,
      backgroundColor: '#eee'
    };

    const rejectStyle = {
      backgroundColor: '#ffdddd'
    };
		return (
			<Container className="SignupForm">
				<Row>
					<Col></Col>
						<Col className="col-8">
						<Card color="amber lighten-4">
							<CardBody>
								<h2 style={styles.heading}>Register</h2>
									<hr />
									<label htmlFor="name">First Name: </label>
									<Input
										type="text"
										name="firstname"
										size = "sm"
										value={this.state.firstname}
										onChange={this.handleChange('firstname')}
									/>
									<label htmlFor="name">Last Name: </label>
									<Input
										type="text"
										name="lastname"
										size = "sm"
										value={this.state.lastname}
										onChange={this.handleChange('lastname')}
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
									<br/> 
									{
										this.state.error && (<h5 component="p" className="deep-orange-text">
											<Fa icon="exclamation-circle" className="deep-orange-text"/>
											{this.state.error}</h5>)
									}
									<div className="text-center">
										<Button onClick={this.handleSubmit}>Register</Button>
									</div>
									</CardBody>
								</Card>
							</Col>
						<Col></Col>
					</Row>
				</Container>
		)
	}
}

export default Register;

