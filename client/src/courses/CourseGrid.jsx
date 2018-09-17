import React, {Component} from 'react'
import { Row, Col, Button, Chip } from 'mdbreact';

import Enroll from '../courses/Enroll'
import Modal from '../core/Modal'
import CreateCourse from './CreateCourse'
import { list, listTeacherCourses } from './api-course'
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
    userId: '', 
    gridMessage: ''
  }  

  componentDidMount = () => {
    this.loadCourses()
  }

  loadCourses = () => {
    const jwt = auth.isAuthenticated()
    console.log(jwt.user)

    if (jwt.user.role === "teacher") {
      console.log(jwt.user.role)
      listTeacherCourses({
        userId: jwt.user._id
      }, {
        t: jwt.token
      }).then((courses) => {
        console.log(courses)
        if (courses.length === 0) {
          console.log("No courses!")
          this.setState({gridMessage: "Create your first course."})
        }
        else {
          this.setState({courses: courses})
          console.log(courses)
        }
      })
    }
    else if (jwt.user.role === "student") {
      console.log(jwt.user.role)
      list().then((courses) => {
        if (courses.length === 0) {
          console.log("No courses!")
          this.setState({gridMessage: "Enroll in class to get started!"})
        }
        else {
          console.log(courses)
          let studentCourses = []
          for (let i=0; i<courses.length; i++) {
            if (courses[i].students.includes(this.state.userId)) {
              studentCourses.push(courses[i])
            }
          }
          this.setState({courses: studentCourses})
          console.log(this.state.courses)
        }
      })
    }
    else {
      this.setState({gridMessage: "Error loading courses. No role set."})
      console.log("Error. No role set.")
    }
  }

  render() {

    return (
      <div>
      <Row>      
        <Col>
          {this.state.courses.map((course, i) => { 
            const photoUrl = course.photo
            ? `/api/courses/photo/${this.state.course._id}?${new Date().getTime()}`
            : '/api/courses/defaultphoto'
            return <div className="d-flex-column d-wrap" key={i}>
                      <a href={'course/'+ course._id}><Chip className="justify-content-center z-depth-1-half" bgColor="cyan darken-2" text="white" size="lg" src={photoUrl} alt="Courses" waves>{course.title}</Chip></a>
                   </div>
          })}
        </Col>
      </Row>  
      <Row>
        <div className="d-inline-flex p-2 float-right">
            <div>{this.state.gridMessage}</div>
            <Modal header={"Add A Course"} closeButton={"Cancel"} openButton={"Add A Course"} body={<Enroll userId={this.state.userId}/>}/>
            <Modal header={"Create A Course"} closeButton={"Cancel"} openButton={"Create A Course"} body={<CreateCourse userId={this.state.userId}/>}/>
        </div>
      </Row>
    </div>
    )}
  }


export default CourseGrid;
 
