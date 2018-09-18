import React, { Component } from "react";
import { Container, Row, Col, Badge, Button, Card, CardBody } from 'mdbreact';

import {create} from './api-user'

const styles = {
  heading: {
    fontWeight: 300
  }
}

class Register extends Component {
  constructor(props) {
		super(props)

		this.state = {
			firstname: '',
			lastname: '',
			password: '',
			email: '',
			courseCode: '',
			role: '',
			error: '', 
			photo: '',
			success: ''
		};
	}

  handleChange = name => e => {
		this.setState({[name]: e.target.value})
	}

	componentDidMount = () => {
		console.log(this.props)
		let roleParam =  this.props.match.params.role;
		let roleCap = roleParam.charAt(0).toUpperCase() + roleParam.slice(1)
		this.setState({role: roleCap})
	}

  handleSubmit = (event) => {
		event.preventDefault();
		const fullname = this.state.firstname + ' ' + this.state.lastname;
    const user = {
			firstname: this.state.firstname || undefined,
			lastname: this.state.lastname || undefined,
			name: fullname || undefined,
      email: this.state.email || undefined,
			password: this.state.password || undefined,
			courseCode: this.state.courseCode || undefined,
			role: this.state.role|| undefined
		}
    create(user).then((data) => {
			console.log(data)
      if (data.error) {
				this.setState({error: data.error})
			if (data.error === "11000 duplicate key error collection: schoolDB.users index: email already exists") {
				this.setState({error: "User already exists. Need to reset your password?"})
			}
      } else {
				this.setState({error: '', success: 'Registration successful! Log in here.'})
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
								{ this.state.role === "Teacher"
							? (<h2 className="text-center mb-4" style={styles.heading}>Start Teaching!</h2>)
							: (<h2 className="text-center mb-4" style={styles.heading}>Start Learning!</h2>)
						}
								<h5 className="text-center mb-4" style={styles.heading}>{this.state.role} Registration</h5>
									<hr />
									{
										this.state.error && (<h4 className="text-center">
											<Badge tag="a" href="#!" color="danger">{this.state.error}</Badge></h4>)
									} 
										{
										this.state.success && (<h4 className="text-center">
											<Badge tag="a" href="/login" color="success">{this.state.success}</Badge></h4>)
									}
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
									{ this.state.role === "Student"
									? (
										<div>
											<label className="grey-text" htmlFor="courseCode">If you're enrolling in a course, enter the class code below.</label>
											<input
												type="courseCode"
												name="courseCode"
												className="form-control"
												value={this.state.courseCode}
												onChange={this.handleChange('courseCode')} 
											/>
										</div>
									) : (
										<div></div>
									)}
									<br/> 
									<div className="text-center">
										<Button onClick={this.handleSubmit}>Register</Button>
									</div>
									</CardBody>
								</Card>
							</Col>
						<Col></Col>
					</Row>
					<Row>
						<Col>
								<div className="text-center mt-5">
									<Button color="amber" size="md" href="/">Back Home</Button>
								</div>
						</Col>
					</Row>
				</Container>
		)
	}
}

export default Register;


