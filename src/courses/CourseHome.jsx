import React, { Component } from 'react';
import { Container, Row, Col, View, Mask, CardBody, Button, Fa } from 'mdbreact';
import Vimeo from '@u-wave/react-vimeo';


class CompHome extends Component {
  render() {
    return(
      <Container>
        <section className="text-center my-5">
          <h2 className="white-text h1-responsive font-weight-bold my-5">Our Most Popular Courses</h2>
          <p className="white-text w-responsive mx-auto mb-5">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit est laborum.</p>
          <Row className="text-center">
            <Col lg="4" md="12" className="mb-lg-0 mb-4">
            <Vimeo video="288973599" autoplay />    
            </Col>
          </Row>
        </section>
      </Container>
    );
  };
}

export default CompHome;
 