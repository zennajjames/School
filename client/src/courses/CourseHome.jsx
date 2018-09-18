import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'mdbreact';
import Vimeo from '@u-wave/react-vimeo';

import {read} from './api-course'
import auth from '../auth/auth-helper.js'

class CourseHome extends Component {

  state = {
    course: [],
    error: ''
  }

  componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    console.log(jwt)
    read({
      courseId: this.props.match.params.courseId
    }, {t: jwt.token}).then((data) => {
      console.log(data)
      if (!data) {
        this.setState({error: "No data!"})
      } else {
        this.setState({course: data})
        console.log(this.state.course)
      }
    })
  }
  

  render() {
    return(
      <Container>
        <section className="text-center my-5">
          <h2 className="white-text h1-responsive font-weight-bold my-5">An Introduction To Mosaics</h2>
          <p className="white-text w-responsive mx-auto mb-5">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit est laborum.</p>
          <Row className="text-center">
            <Col>
              <div className="text-center">
                <Vimeo video="288973599" autoplay />    
              </div>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <div className="text-center">
                <br/>
                <Button size="lg" color="amber darken-2">Lessons</Button>  
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    );
  };
}

export default CourseHome;