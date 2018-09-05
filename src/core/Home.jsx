import React, { Component } from 'react';
import { Container, Row, Col, Button, Fa, Card } from 'mdbreact';
// import PropTypes from 'prop-types'
import auth from '../auth/auth-helper'
// import FindPeople from './../user/FindPeople'
// import Newsfeed from './../post/Newsfeed'

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
    // const {classes} = this.props
    return(
      <Container>
        <section className="text-center my-5">
          <h2 className="h1-responsive font-weight-bold my-5">Creative Classroom.</h2>
          <p className="grey-text w-responsive mx-auto mb-5">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit est laborum.</p>
          <Row>
          {this.state.defaultPage &&
            <Col md="12" className="mb-4">
              <Card className="card-image" style={{backgroundImage: 'url(/assets/images/files.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="text-white text-center d-flex align-items-center py-5 px-4 rounded">
                  <div>
                    <h6 className="purple-text">
                      <Fa icon="paperclip"></Fa><strong> Sign In</strong>
                    </h6>
                    <h3 className="py-3 font-weight-bold">
                      <strong>Welcome! Sign in!</strong>
                    </h3>
                    <p className="pb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem, optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!</p>
                    <Button color="secondary" rounded size="md"><Fa icon="clone" className="left"/> View project</Button>
                  </div>
                </div>
              </Card>
              <div>
              </div>
            </Col>
          }
          {!this.state.defaultPage &&
            <Col md="12" className="mb-4">
              <Card className="card-image" style={{backgroundImage: 'url(/assets/images/files.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="text-white text-center d-flex align-items-center py-5 px-4 rounded">
                  <div>
                    <h6 className="purple-text">
                      <Fa icon="paperclip"></Fa><strong> Sign In</strong>
                    </h6>
                    <h3 className="py-3 font-weight-bold">
                      <strong>Welcome, {this.props.user}!</strong>
                    </h3>
                    <p className="pb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem, optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!</p>
                    <Button color="secondary" rounded size="md"><Fa icon="clone" className="left"/> View project</Button>
                  </div>
                </div>
              </Card>
              <div>
              </div>
            </Col>
          }
          </Row>
        </section>   
      </Container>
    );
  };
}


export default Home;