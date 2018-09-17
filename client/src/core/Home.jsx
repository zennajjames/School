import React, { Component } from 'react';
import { Container, Row, Col, Button, Fa, Card } from 'mdbreact';
// import PropTypes from 'prop-types'
import auth from '../auth/auth-helper'
import Newsfeed from '../post/Newsfeed.jsx'
import CourseGrid from '../courses/CourseGrid'

const styles = {
  heading: {
    fontWeight: 400,
    color: "white",
    paddingTop: 16
  },
  divider: {
    color: "white",
    marginBottom: 20
  }
}


class Home extends Component {

  state = {
    defaultPage: true
  }

  init = () => {
    if(auth.isAuthenticated()){
      this.setState({defaultPage: false})
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

  render() {
    console.log(this.props)
    return(
      <Container style={{paddingTop: '8%'}}>
        {this.state.defaultPage &&
        <section className="text-center my-5">
          <img style={{ maxWidth: '35%', WebkitFilter: 'drop-shadow(1px 1px 1px #8a8a8a)', filter: 'drop-shadow(1px 1px 1px #4d4d4d)', paddingBottom: 5}} src="/assets/images/schoolTitle.png" alt="logo"/><br/>
          <img style={{ maxWidth: '150px', WebkitFilter: 'drop-shadow(1px 1px 1px #8a8a8a)', filter: 'drop-shadow(1px 1px 1px #4d4d4d)'}} src="/assets/images/schoolFish.png" alt="logo"/><br/>
          
          <h5 className="white-text w-responsive mx-auto mt-5">Are you a student or a teacher?</h5>
            <br/>
            <Row>
              <Col></Col>
              <Col md="4" className="mb-2">
                <Button href="/courses" color="amber darken-1" rounded size="md"><Fa icon="clone" className="left"/> Students</Button>
              </Col>
              <Col md="4" className="mb-2">
                  <Button href="/courses" color="amber darken-1" rounded size="md"><Fa icon="clone" className="left"/> Teachers</Button>
              </Col>
              <Col></Col>
            </Row>
        </section>   
          }
          {!this.state.defaultPage &&
            <Row>
            <Col className="col-12 col-lg-8 col-sm-10">
              <Newsfeed/>
            </Col>
            <Col className="clo-12 col-lg-4">
              <div>
                <h5 style={styles.heading}>My Courses</h5>
                <hr />
              </div>
              <Card style={{padding:20}}>
                <CourseGrid/>
              </Card>
            </Col>
            </Row>
          }
      </Container>
    );
  };
}


export default Home;


