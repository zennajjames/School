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
		classcode: '',
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
			classcode: this.state.classcode || undefined,
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
						<Col className="col-6">
						<Card>
							<CardBody>
								<h2 className="text-center mb-4" style={styles.heading}>Register</h2>
									<hr />
									<label className="grey-text" htmlFor="name">First Name: </label>
									<input
										type="text"
										name="firstname"
									  className="form-control"
										value={this.state.firstname}
										onChange={this.handleChange('firstname')}
									/>
									<br/>
									<label className="grey-text" htmlFor="name">Last Name: </label>
									<input
										type="text"
										name="lastname"
									  className="form-control"
										value={this.state.lastname}
										onChange={this.handleChange('lastname')}
									/>
									<br/>
									<label className="grey-text" htmlFor="email">Email: </label>
									<input
										type="text"
										name="email"
									  className="form-control"
										value={this.state.email}
										onChange={this.handleChange('email')}
									/>
									<br/>
									<label className="grey-text" htmlFor="password">Password: </label>
									<input
										type="password"
										name="password"
									  className="form-control"
										value={this.state.password}
										onChange={this.handleChange('password')} 
									/>
									<br/> 
									<label className="grey-text" htmlFor="classcode">Class Code: </label>
									<input
										type="classcode"
										name="classcode"
									  className="form-control"
										value={this.state.classcode}
										onChange={this.handleChange('classcode')} 
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

