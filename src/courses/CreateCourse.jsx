import React, { Component } from "react";
import { Container, Row, Col, Badge, Button, Card, CardBody } from 'mdbreact';


import {create} from './api-course'

const styles = {
  heading: {
    fontWeight: 300
  }
}

class CreateCourse extends Component {
  
  state = {
		title: '',
		description: '',
		instructor: '',
		coursePhoto: '',
		courseCode: '',
		modal: false,
		error: '', 
		success: ''
  };

	componentDidMount = () => {
		console.log(this.props)
	}
  handleChange = name => event => {
    this.setState({[name]: event.target.value})
	}

  handleSubmit = () => {
    const course = {
			title: this.state.title || undefined,
			description: this.state.description || undefined,
			instructor: this.state.instructor || undefined,
      coursePhoto: this.state.coursePhoto || undefined,
			courseCode: this.state.courseCode || undefined
		}
    create(course).then((data) => {
			console.log(data)
      if (data.error) {
				this.setState({error: data.error})
      } else {
				this.setState({error: '', success: 'Course created! View your courses here.'})
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
								<h2 className="text-center mb-4" style={styles.heading}>Create A Course</h2>
									<hr />
									<label className="grey-text" htmlFor="name">Course Title: </label>
									<input
										type="text"
										name="title"
									  className="form-control"
										value={this.state.title}
										onChange={this.handleChange('title')}
									/>
									<br/>
									<label className="grey-text" htmlFor="description">Description: </label>
									<input
										type="text"
										name="description"
									  className="form-control"
										value={this.state.description}
										onChange={this.handleChange('description')}
									/>
									<br/>
									<label className="grey-text" htmlFor="courseCode">Course Code: </label>
									<input
										type="courseCode"
										name="courseCode"
									  className="form-control"
										value={this.state.courseCode}
										onChange={this.handleChange('courseCode')} 
									/>
									<br/> 
									{
										this.state.error && (<h4>
											<Badge className="mx-auto" tag="a" href="#!" color="danger">{this.state.error}</Badge></h4>)
									} 
										{
										this.state.success && (<h4>
											<Badge tag="a" href="/api/users/findcourses/" color="success">{this.state.success}</Badge></h4>)
									}
									<div className="text-center">
										<Button onClick={this.handleSubmit}>Create</Button>
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

export default CreateCourse;


