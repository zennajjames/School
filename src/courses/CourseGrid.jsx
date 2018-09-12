import React, {Component} from 'react'
import { Row, Col, Button, Chip } from 'mdbreact';

import Enroll from '../user/profile/Enroll'
import Modal from '../core/Modal'
import CreateCourse from './CreateCourse'
import { listCoursesByUser} from './api-course'
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
  }
  getCourses = () => {
    console.log("Mounted!")
    const jwt = auth.isAuthenticated()
    listCoursesByUser({userId: jwt.user._id}, {t: jwt.token})
    .then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(data)
        this.setState({courses: data})
        console.log("Success!")
      }
    })
  }

  componentDidMount = () => {
    console.log(this.props)
    this.getCourses()
  }

  render() {
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
            <Modal header={"Add A Course"} closeButton={"Cancel"} openButton={"Add A Course"} body={<Enroll userId={this.props.userId}/>}/>
            <Modal header={"Create A Course"} closeButton={"Cancel"} openButton={"Create A Course"} body={<CreateCourse userId={this.props.userId}/>}/>
        </div>
      </Row>
    </div>
    )}
  }


export default CourseGrid;
 
