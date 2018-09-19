import React, { Component } from 'react';
import { Container, Card, Row, Col, Button, Fa } from 'mdbreact';
import auth from '../auth/auth-helper'
import Newsfeed from '../post/Newsfeed.jsx'
import CourseGrid from '../courses/CourseGrid'
import FollowGrid from '../user/profile/FollowGrid'
import {read} from '../user/api-user'

import Enroll from '../courses/Enroll'
import Modal from './Modal'
import CreateCourse from '../courses/CreateCourse'

const styles = {
  heading: {
    fontWeight: 400,
    color: "white",
    paddingTop: 10
  }
}
class Home extends Component {

  state = {
    defaultPage: true,
    userFollowing: [],
    role: ''
  }

  init = () => {
    if(auth.isAuthenticated()){
      this.setState({defaultPage: false})
      this.loadFollowing()
    }else{
      this.setState({defaultPage: true})
    }
  }

  componentWillReceiveProps = () => {
    this.init()
  }

  componentDidMount = () => {
    this.init()
  }

  loadFollowing = () => {
    const jwt = auth.isAuthenticated()
    console.log(jwt.user)
      read({
        userId: jwt.user._id
      }, {t: jwt.token}).then((data) => {
        console.log(data)
        this.setState({userFollowing: data.following})
        this.setState({role: data.role})
      })
    }

  render() {
    return(
      <Container>
        {this.state.defaultPage &&
        <section className="align-middle text-center my-5">
          <div className="align-middle text-center mt-3">
            <img className="w-responsive mx-auto" style={{ minWidth: "180px", maxWidth: '25%', WebkitFilter: 'drop-shadow(1px 1px 1px #8a8a8a)', filter: 'drop-shadow(1px 1px 1px #4d4d4d)', paddingBottom: 5}} src="/assets/images/schoolTitle.png" alt="logo"/><br/>
            <img className="w-responsive mx-auto" style={{ minWidth: "130px", maxWidth: '20%', WebkitFilter: 'drop-shadow(1px 1px 1px #8a8a8a)', filter: 'drop-shadow(1px 1px 1px #4d4d4d)'}} src="/assets/images/schoolFish.png" alt="logo"/><br/>
            <h3 className="white-text w-responsive mx-auto mt-5">An online learning community.</h3>
            <h5 className="white-text w-responsive mx-auto mt-5">Are you a student or a teacher?</h5>
              <br/>
            <Row>
              <Col></Col>
              <Col md="4" className="mb-2">
                <Button href="/register/student" color="amber darken-1" rounded size="md"><Fa icon="clone" className="left"/> Students</Button>
              </Col>
              <Col md="4" className="mb-2">
                  <Button href="/register/teacher" color="amber darken-1" rounded size="md"><Fa icon="clone" className="left"/> Teachers</Button>
              </Col>
              <Col></Col>
            </Row>
          </div>
        </section>   
          }
          {!this.state.defaultPage &&
            <div>
              <Row>
              <Col className="col-12 col-lg-8 col-sm-10" style={{paddingBottom:"2rem"}}>
                <Newsfeed/>
              </Col>
              <Col className="col-12 col-lg-4 col-sm-10">
                  <div className="d-inline-block">
                  <h5 style={styles.heading} type="title">My Courses</h5>
                </div>
                <div className="d-inline-block float-right">
                    { this.state.role === "Student"
                      ? <Modal header={"Add A Course"} closeButton={"Cancel"} openButton={"Add A Course"} body={<Enroll userId={this.state.userId}/>}/>

                      : <Modal header={"Create A Course"} closeButton={"Cancel"} openButton={"Create A Course"} body={<CreateCourse userId={this.state.userId}/>}/>
                    } 
                </div>
                <hr />  
              <Card>
                  <CourseGrid/> 
              </Card>
                  <div className="mt-3">
                  <h5 style={styles.heading} type="title">Connections</h5>
                  <hr />
                  <Card>
                    <FollowGrid people={this.state.userFollowing}/> 
                  </Card>
                  <div className="text-center">
                      <Button color="amber darken-2 m-2" size="md" href="/students">Find More Connections</Button>
                  </div>
                  </div>   
              </Col>
              </Row>
            </div>
          }
      </Container>
    );
  };
}


export default Home;


