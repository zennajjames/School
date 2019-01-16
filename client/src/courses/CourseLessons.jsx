import Vimeo from '@u-wave/react-vimeo';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Button, Container, Row, Col, TabPane, TabContent, Nav, NavItem, NavLink } from 'mdbreact';
import auth from '../auth/auth-helper.js'

import { Redirect } from 'react-router-dom'
import classnames from 'classnames';

import {listOne} from './api-course'


class CourseLessons extends React.Component {
  
   state = {
      activeItemClassicTabs1: '1', 
      title: '',
      id: '',
      description: '',
      redirectToSignin: false,
      course: [],
      videoIndex: 0,
      volume: 1,
      paused: false,
    }

  selectVideo(index) {
    this.setState({ videoIndex: index });
  }

  componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    console.log(jwt)
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
        }
      })
    }

  toggleClassicTabs1 = (tab) => {
    if (this.state.activeItemClassicTabs1 !== tab) {
      this.setState({
        activeItemClassicTabs1: tab,
      });
    }
  }

  render() {
    const videos = [
      { id: 285529861, name: 'Symmetry' },
      { id: 290527909, name: 'Color and Relationship' },
      { id: 285529794, name: 'Radial Balance' },
      { id: 290527936, name: 'Focal Point: Part One' },
      { id: 290528007, name: 'Strategies For Building A Composition' },
      { id: 290528168, name: 'The Abstraction Continuum' }
    ];
    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <Router>
        <Container>
          <div className="text-center">
            <h2 className="white-text h1-responsive font-weight-bold my-5">{this.state.course.title}</h2>
          </div>
          <Row>
            <Col className="col-10 mx-auto">
              <div className="classic-tabs">
                <Nav classicTabs color="amber darken-2">
                  <NavItem>
                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '1' })} onClick={() => { this.toggleClassicTabs1('1'); }}>
                      Lesson One
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '2' })} onClick={() => { this.toggleClassicTabs1('2'); }}>
                      Lesson Two
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '3' })} onClick={() => { this.toggleClassicTabs1('3'); }}>
                    Lesson Three
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '4' })} onClick={() => { this.toggleClassicTabs1('4'); }}>
                    Lesson Four
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '5' })} onClick={() => { this.toggleClassicTabs1('5'); }}>
                      Lesson Five
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '6' })} onClick={() => { this.toggleClassicTabs1('6'); }}>
                      Lesson Six
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent className="card" activeItem={this.state.activeItemClassicTabs1}>
                <TabPane tabId="1">
                  <h3 className="d-inline">Balance Strategies: Organizing The Picture World</h3>
                  <hr />
                  <Row className="text-center">
                    <Col>
                      <div className="text-center m-1">
                        <Vimeo
                            className="m-3"
                            video={videos[0].id}
                            autoplay
                          />  
                      </div>
                    </Col>
                  </Row>
                  <Row className="text-center m-3">
                    <Col>
                      <Button color="cyan darken-1">Lecture Notes</Button>
                    </Col>
                    <Col>
                      <Button color="cyan darken-1">Exercises</Button>
                    </Col>
                    <Col>
                      <Button color="cyan darken-1">Assignments</Button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <h3>Contrast And Relationship</h3>
                  <hr />
                  <Row className="text-center">
                    <Col>
                      <div className="text-center">
                      <Vimeo
                            className="m-3"
                            video={videos[1].id}
                            autoplay
                          />  
                      </div>
                    </Col>
                  </Row>
                  <Row className="text-center m-3">
                    <Col>
                      <Button color="cyan darken-1">Lecture Notes</Button>
                    </Col>
                    <Col>
                      <Button color="cyan darken-1">Exercises</Button>
                    </Col>
                    <Col>
                      <Button color="cyan darken-1">Assignments</Button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <h3>Radial and Crystallographic Balance</h3>
                  <hr />
                  <Row className="text-center">
                    <Col>
                      <div className="text-center">
                      <Vimeo
                            className="m-3"
                            video={videos[2].id}
                            autoplay
                          />  
                      </div>
                    </Col>
                  </Row>
                  <Row className="text-center m-3">
                    <Col>
                      <Button color="cyan darken-1">Lecture Notes</Button>
                    </Col>
                    <Col>
                      <Button color="cyan darken-1">Exercises</Button>
                    </Col>
                    <Col>
                      <Button color="cyan darken-1">Assignments</Button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <h3>Focal Point</h3>
                  <hr />
                  <Row className="text-center">
                    <Col>
                      <div className="text-center">
                      <Vimeo
                            className="m-3"
                            video={videos[3].id}
                            autoplay
                          />  
                      </div>
                    </Col>
                  </Row>
                  <Row className="text-center m-3">
                    <Col>
                      <Button color="cyan darken-1">Lecture Notes</Button>
                    </Col>
                    <Col>
                      <Button color="cyan darken-1">Exercises</Button>
                    </Col>
                    <Col>
                      <Button color="cyan darken-1">Assignments</Button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="5">
                  <h3>Strategies For Buiding A Composition</h3>
                  <hr />
                  <Row className="text-center">
                    <Col>
                      <div className="text-center">
                      <Vimeo
                            className="m-3"
                            video={videos[4].id}
                            autoplay
                          />  
                      </div>
                    </Col>
                  </Row>
                  <Row className="text-center m-3">
                    <Col>
                      <Button color="cyan darken-1">Lecture Notes</Button>
                    </Col>
                    <Col>
                      <Button color="cyan darken-1">Exercises</Button>
                    </Col>
                    <Col>
                      <Button color="cyan darken-1">Assignments</Button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="6">
                  <h3>The Abstraction Continuum</h3>
                  <hr />
                  <Row className="text-center">
                    <Col>
                      <div className="text-center">
                      <Vimeo
                            className="m-3"
                            video={videos[5].id}
                            autoplay
                          />  
                      </div>
                    </Col>
                  </Row>
                  <Row className="text-center m-3">
                    <Col>
                      <Button color="cyan darken-1">Lecture Notes</Button>
                    </Col>
                    <Col>
                      <Button color="cyan darken-1">Exercises</Button>
                    </Col>
                    <Col>
                      <Button color="cyan darken-1">Assignments</Button>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
            <div className="text-center" style={{margin:"2rem"}}>
                <Button href={'/courses/'+this.state.course._id}>Back To Course Home</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Router>
    );
  }
}

export default CourseLessons;



    // const joined = moment(new Date(this.state.user.created)).format("LL")
    // const photoUrl = this.state.course._id
    //           ? `/api/users/photo/${this.state.user._id}?${new Date().getTime()}`
    //           : '/api/users/defaultphoto'
    // const userId = this.state.user._id
