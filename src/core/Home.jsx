import React, { Component } from 'react';
import { Container, Row, Col, Button, Fa } from 'mdbreact';
// import PropTypes from 'prop-types'
import auth from '../auth/auth-helper'
import Newsfeed from '../post/Newsfeed.jsx'


const styles = {
  heading: {
    fontWeight: 300
  },
  logo: {
    maxWidth: 250
  },
  fish: {
    maxWidth: 150
  },
  divider: {
    color: "white"
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
      <Container>
        {this.state.defaultPage &&
        <section className="text-center my-5">
          <img style={styles.logo} src="/assets/images/schoolTitle.png" alt="logo"/><br/>
          <img style={styles.fish} src="/assets/images/schoolFish.png" alt="logo"/>
          <hr style={styles.divider} />
            <h5 className="white-text w-responsive mx-auto mb-5">Are you a student or a teacher?</h5>
            <Row>
              <Col md="6" className="mb-4">
                  <Button href="/courses" color="amber darken-1" rounded size="md"><Fa icon="clone" className="left"/> Students</Button>
              </Col>
              <Col md="6" className="mb-4">
                  <Button href="/courses" color="amber darken-1" rounded size="md"><Fa icon="clone" className="left"/> Teachers</Button>
              </Col>
            </Row>
        </section>   
          }
          {!this.state.defaultPage &&
            <Row>
            <Col className="col-8">
              <Newsfeed/>
            </Col>
            <Col className="col-4">
            </Col>
            </Row>
          }
      </Container>
    );
  };
}


export default Home;
