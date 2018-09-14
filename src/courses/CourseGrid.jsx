import React, {Component} from 'react'
import { Row, Col, Button, Chip } from 'mdbreact';

import Enroll from '../courses/Enroll'
import Modal from '../core/Modal'
import CreateCourse from './CreateCourse'
import { list } from './api-course'
import auth from '../auth/auth-helper.js'


const styles = {
  avatar: {
    width: 75,
    height: 75,
    margin: 5,
    borderRadius: 50
  },
  heading: {
    color: "white"
  },
  badge: {
    width: 250,
    height:90
  },
  nameLink: {
    color: "black",
    fontSize: 16
  }
}


class CourseGrid extends Component {
  
  state = {
    courses: [],
    open: false,
    userId: ''
  }  

  componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    this.setState({userId: jwt.user._id})
    list().then((data) => {
      console.log(data)
      if (!data) {
        console.log("No data!")
      }
      else {
        this.setState({courses: data})
        console.log(data)
        console.log(this.state.userId)
      }
    })
  }

  render() {
    let userId = this.state.userId
    let courses = this.state.courses
    let userCourses = []
      for (let i = 0; i<courses.length; i++) {
        if (courses[i].students.includes(userId)) {
            userCourses.push(courses[i])
        }
      }
      console.log(userCourses)

    return (
      <div>
      <Row>      
        <Col>
          {this.state.courses.map((course, i) => { 
            const photoUrl = course.photo
            ? `/api/courses/photo/${this.state.user._id}?${new Date().getTime()}`
            : '/api/courses/defaultphoto'
            return <div className="d-flex-column d-wrap" key={i}>
                      <a href={'course/'+ course._id}><Chip className="justify-content-center z-depth-1-half" bgColor="cyan darken-2" text="white" size="lg" src={photoUrl} alt="Courses" waves>{course.title}</Chip></a>
                   </div>
          })}
        </Col>
      </Row>  
      <Row>
        <div className="d-inline-flex p-2 float-right">
            <Modal header={"Add A Course"} closeButton={"Cancel"} openButton={"Add A Course"} body={<Enroll userId={this.state.userId}/>}/>
            <Modal header={"Create A Course"} closeButton={"Cancel"} openButton={"Create A Course"} body={<CreateCourse userId={this.state.userId}/>}/>
        </div>
      </Row>
    </div>
    )}
  }


export default CourseGrid;
 
