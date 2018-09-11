import React, {Component} from 'react'
import { Button, Badge, Chip, ListGroup } from 'mdbreact';


// import {Link} from 'react-router-dom'
import {findCourses, courseByCode, listCoursesByUser} from './api-course'
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
        this.setState({courses: data})
        console.log("Success")
      }
    })
  }

  render() {
    console.log(this.props.courses)
    return (
    <div>     
     <Button onClick={this.getCourses}>Get Courses</Button>
     
    <h4 style={styles.heading}>Courses</h4>
     <hr />
     <ListGroup>
     {this.state.courses.map((course, i) => { 
       return <span className="d-flex flex-row" key={i}>
       <Chip className="z-depth-1-half" bgColor="amber" text="white" size="lg" src={'/api/courses/photo/'+course._id} alt="Classmates" waves>{course.title}</Chip>
       <h6 className="p-2"><Badge color="cyan">Go To Course</Badge></h6>
       </span>
     })
     }
     </ListGroup>
    </div>
      )
  }
}


export default CourseGrid;
 
