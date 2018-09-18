import React, {Component} from 'react'
import { Row, Col, Chip, Card } from 'mdbreact';

import Enroll from '../courses/Enroll'
import Modal from '../core/Modal'
import CreateCourse from './CreateCourse'
import { list } from './api-course'
// import {read, update, remove} from '../user/api-user'
import auth from '../auth/auth-helper.js'

const styles = {
  avatar: {
    width: 75,
    height: 75,
    margin: 5,
    borderRadius: 50
  },
  heading: {
    fontWeight: 400,
    color: "white",
    paddingTop: 10
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
    gridMessage: '', 
    courseLink: '', 
    role: ''
  }  

  componentDidMount = () => {
    this.loadCourses()
  }

  loadCourses = () => {

    const jwt = auth.isAuthenticated()
    console.log(jwt.user)
    this.setState({userId: jwt.user._id})
    this.setState({role: jwt.user.role})

    if (jwt.user.role === "teacher") {
      console.log(jwt.user.role)
      list().then((courses) => {
        console.log(courses)
        let teacherCourses = []
        
        for (let i=0; i<courses.length; i++) {
          if (courses[i].instructor === jwt.user._id) {
            teacherCourses.push(courses[i])
          }
        }
        if (teacherCourses.length === 0) {
          console.log("No courses!")
          this.setState({gridMessage: "Create your first course to get started!"})
        }
        else {
          this.setState({courses: teacherCourses})
          console.log(this.state.courses)
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
        <div className="d-inline-block">
          <h5 style={styles.heading} type="title">My Courses</h5>
        </div>
        <div className="d-inline-block float-right">
            { this.state.role === "student"
              ? <Modal header={"Add A Course"} closeButton={"Cancel"} openButton={"Add A Course"} body={<Enroll userId={this.state.userId}/>}/>

              : <Modal header={"Create A Course"} closeButton={"Cancel"} openButton={"Create A Course"} body={<CreateCourse userId={this.state.userId}/>}/>
            } 
        </div>
        <hr />  
        <Card>
          <Row>  
          { this.state.courses.length > 0    
            ? <Col>
              <div className="m-4">
                {this.state.courses.map((course, i) => { 
                  const photoUrl = course.photo
                  ? `/api/courses/photo/${this.state.course._id}?${new Date().getTime()}`
                  : '/api/courses/defaultphoto'
                  return <div className="d-flex-column d-wrap" key={i}>
                            <a href={'course/'+ course._id}><Chip className="justify-content-center z-depth-1-half" bgColor="cyan darken-2" text="white" size="lg" src={photoUrl} alt="Courses" waves>{course.title}</Chip></a>
                        </div>
                })}
              </div>
              </Col>
            :  <Col>
                  <div className="text-center m-2">
                     <h5>{this.state.gridMessage}</h5>
                  </div>
              </Col>
            }
          </Row>       
        </Card>   
    </div>
    )}
  }


export default CourseGrid;
 
