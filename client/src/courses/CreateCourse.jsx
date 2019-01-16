import React, { Component } from "react";
import { Container, Badge, Button } from 'mdbreact';
// import auth from '../auth/auth-helper'

import {create} from './api-course'

class CreateCourse extends Component {

		state = {
			title: '',
			description: '',
			tagline: '',
			instructor: this.props.userId,
			coursePhoto: '',
			courseCode: '',
			error: '', 
			success: ''
		};
	
  handleChange = name => event => {
    this.setState({[name]: event.target.value})
	}

  handleSubmit = () => {
    const course = {
			title: this.state.title || undefined,
			description: this.state.description || undefined,
			instructor: this.state.instructor || undefined,
      coursePhoto: this.state.coursePhoto || undefined,
			courseCode: this.state.courseCode || undefined,
			tagline: this.state.tagline || undefined
		}
		console.log(course.instructor)
    create(course).then((data) => {
			console.log(data)
      if (!data) {
				this.setState({error: "No data!"})
      } else {
				window.location.reload()
			}
    })
	}

  render() {
		console.log(this.props.userId)
		return (
				
							<Container>
									<label className="grey-text" htmlFor="name">Course Title: </label>
									<input
										type="text"
										name="title"
									  className="form-control"
										value={this.state.title}
										onChange={this.handleChange('title')}
									/>
									<br/>
									<label className="grey-text" htmlFor="tagline">Tagline: </label>
									<input
										type="tagline"
										name="tagline"
									  className="form-control"
										value={this.state.tagline}
										onChange={this.handleChange('tagline')} 
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
										this.state.error && (<div className="text-center"><h4>
											<Badge className="mx-auto" tag="a" href="#!" color="danger">{this.state.error}</Badge></h4></div>)
									} 
										{
										this.state.success && (<div className="text-center"><h4>
											<Badge tag="a" href="/courses" color="success">{this.state.success}</Badge></h4></div>)
									}
									<div className="text-center">
										<Button onClick={this.handleSubmit}>Create</Button>
									</div>
									</Container>
			
		)
	}
}

export default CreateCourse;


