import React, {Component} from 'react'
import { Row, Col, Chip } from 'mdbreact';
import { list } from './api-course'
import auth from '../auth/auth-helper.js'

const styles = {
  heading: {
    fontWeight: 400,
    color: "white",
    paddingTop: "1.5rem",
    paddingLeft: "1.5rem"
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

    if (jwt.user.role === "Teacher") {
      console.log(jwt.user.role)
      list().then((courses) => {
        console.log(courses)
        console.log(jwt.user._id)
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
        }
      })
    }
    else if (jwt.user.role === "Student") {
      console.log(jwt.user.role)
      list().then((courses) => {
          console.log(courses)
          let studentCourses = []
          for (let i=0; i<courses.length; i++) {
            if (courses[i].students.includes(this.state.userId)) {
              studentCourses.push(courses[i])
            }
          }
          this.setState({courses: studentCourses})
          console.log(this.state.courses)
          
          if (studentCourses.length === 0) {
            console.log("No courses!")
            this.setState({gridMessage: "Enroll in class to get started!"})
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
          { this.state.courses.length > 0    
            ? <Col>
              <div className="m-4">
                {this.state.courses.map((course, i) => { 
                  const photoUrl = course.photo
                  ? `/api/courses/photo/${this.state.course._id}?${new Date().getTime()}`
                  : '/api/courses/defaultphoto'
                  return <div className="d-flex-column d-wrap align-items-center" key={i}>
                            <a href={'courses/'+ course._id}><Chip className="justify-content-center z-depth-1-half" bgColor="cyan" text="white" size="lg" src={photoUrl} alt="Courses" waves>{course.title}</Chip></a>
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
    </div>
    )}
  }


export default CourseGrid;
 
