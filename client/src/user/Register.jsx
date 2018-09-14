import React, { Component } from "react";
import { Container, Row, Col, Badge, Button, Card, CardBody } from 'mdbreact';

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
		courseCode: '',
		modal: false,
		error: '', 
		isUploading: false,
		photo: '',
		success: ''
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
	}

  handleSubmit = () => {
		const fullname = this.state.firstname + ' ' + this.state.lastname;
    const user = {
			firstname: this.state.firstname || undefined,
			lastname: this.state.lastname || undefined,
			name: fullname || undefined,
      email: this.state.email || undefined,
			password: this.state.password || undefined,
			courseCode: this.state.courseCode || undefined,
		}
    create(user).then((data) => {
			console.log(data)
      if (data.error) {
				this.setState({error: data.error})
			if (data.error === "11000 duplicate key error collection: SchoolDB.users index: email already exists") {
				this.setState({error: "User already exists. Need to reset your password?"})
			}
      } else {
				this.setState({error: '', success: 'Welcome to School! Log in here.'})
      }
    })
	}

  render() {
		return (
			<Container className="SignupForm">
				<Row>
					<Col></Col>
						<Col className="col-8">
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
									<label className="grey-text" htmlFor="courseCode">Class Code: </label>
									<input
										type="courseCode"
										name="courseCode"
									  className="form-control"
										value={this.state.courseCode}
										onChange={this.handleChange('courseCode')} 
									/>
									<br/> 
									{
										this.state.error && (<h4 className="text-center">
											<Badge tag="a" href="#!" color="danger">{this.state.error}</Badge></h4>)
									} 
										{
										this.state.success && (<h4 className="text-center">
											<Badge tag="a" href="/login" color="success">{this.state.success}</Badge></h4>)
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


