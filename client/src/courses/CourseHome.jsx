import React, { Component } from 'react';
import { Container, Row, Col, Button, Fa } from 'mdbreact';
import Vimeo from '@u-wave/react-vimeo';

import {listOne} from './api-course'
import auth from '../auth/auth-helper.js'

class CourseHome extends Component {

  state = {
    course: [],
    error: '',
    userId: '',
    role: ''
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
          let videoCode = '"'+data.landingVid+'"'
          this.setState({video: videoCode})
          console.log(this.state.course)
          console.log(this.state.video)
        }
      })
  }

  render() {
    const photoUrl = this.state.course.photo
    ? `/api/courses/photo/${this.state.course._id}?${new Date().getTime()}`
    : '/api/courses/defaultphoto'

    return(
      <Container>
        <section className="text-center my-5">
          <h1 className="white-text h1-responsive font-weight-bold my-5">{this.state.course.title}</h1>
          <img alt="coursePhoto" style={{marginBottom:"2rem"}} src={photoUrl}/>
          <h4 className="white-text w-responsive mx-auto mb-5">{this.state.course.description}</h4>
          <Row className="text-center">
            <Col>
              <div className="text-center">
                {/* <Vimeo video={this.state.video} autoplay />     */}
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