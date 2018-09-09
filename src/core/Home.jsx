import React, { Component } from 'react';
import { Container, Row, Col, Button, Fa, Card } from 'mdbreact';
// import PropTypes from 'prop-types'
import auth from '../auth/auth-helper'
import FindPeople from '../user/FindPeople'
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
              <FindPeople/>
            </Col>
            </Row>
          }
      </Container>
    );
  };
}


export default Home;


{/* <Card className="card-image" style={{backgroundImage: 'url(/assets/images/files.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
<div className="text-white text-center d-flex align-items-center py-5 px-4 rounded">
  <div>
    <h6 className="purple-text">
      <Fa icon="paperclip"></Fa><strong> Sign In</strong>
    </h6>
    <h3 className="py-3 font-weight-bold">
      <strong>Welcome! Sign in!</strong>
    </h3>
    <p className="pb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem, optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!</p>
      </div>
                </div>
              </Card> */}