import React, { Component } from 'react';
import { Container, Row, Col, Button, Fa, Badge } from 'mdbreact';
import Vimeo from '@u-wave/react-vimeo';

import {listOne} from './api-course'
import auth from '../auth/auth-helper.js'

class CourseHome extends Component {

  state = {
    course: [],
    error: '',
    userId: '',
    role: '',
    videos: []
  }

  componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    this.setState({userId: jwt.user._id})
    this.setState({role: jwt.user.role})
    this.loadCourseInfo()
  }
    
  loadCourseInfo = () => {
      // const jwt = auth.isAuthenticated()
      listOne({
        courseId: this.props.match.params.courseId
      }).then((data) => {
        if (!data) {
          console.log("No response!")
        } else {
          this.setState({course: data})
          this.setState({videos: data.videos})
        }
      })
  }

  render() {
    const video = [
      { id: 285529861, name: 'Welcome' }
    ];

    const photoUrl = this.state.course.photo
    ? `/api/courses/photo/${this.state.course._id}?${new Date().getTime()}`
    : '/api/courses/defaultphoto'

    return(
      <Container>
        <section className="text-center my-5">
          <h1 className="white-text h1-responsive font-weight-bold my-4">{this.state.course.title}</h1>
          { this.state.role === "Teacher"
          ? (<h3 className="mb-2" ><Badge tag="a" href={"/courses/edit/"+this.props.match.params.courseId} color="amber darken-2" pill>Edit Course</Badge></h3>)
          : (<div></div>)
          }
          <img className="mt-3" alt="coursePhoto" style={{marginBottom:"1rem", width:"20%", maxWidth: "200px"}} src={photoUrl}/>
          <h2 className="white-text h2-responsive my-3">{this.state.course.tagline}</h2>
          <h5 className="white-text h5-responsive mx-auto mb-5">{this.state.course.description}</h5>
          <Row className="text-center">
            <Col>
              <div className="text-center">
                <Vimeo video={video.id} autoplay />    
              </div>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <div className="text-center">
                <br/>
                {
                  this.state.role === "teacher"
                  ? (
                    <div className="d-inline">
                      <Button href={"/courses/lessons/"+ this.state.course._id} size="lg" color="amber darken-2"><Fa icon="eye"/> View Course</Button>  
                      <Button size="lg" color="amber darken-2" href={"/courses/edit/" + this.state.course._id}>
                          <Fa icon="area-chart"/> Edit Course&nbsp;
                      </Button>
                    </div>
                  )
                  : (<div className="text-center">
                        <Button href={"/courses/lessons/"+ this.state.course._id} size="lg" color="amber darken-2"><Fa icon="eye"/> Lessons</Button>  
                     </div>
                  )}  
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    );
  };
}

export default CourseHome;