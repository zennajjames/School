import React, { Component } from 'react';
import { Container, Row, Col, Footer } from 'mdbreact';

class Foot extends Component {
  render() {
    return(

        <Footer color="amber darken-2" className="font-small pt-4 mt-4">
            <Container fluid className="text-center text-md-left">
                <Row>
                <Col sm="8">
                    <h5 className="title">About Classroom</h5>
                    <p>Classroom was developed to more intimately connect students and teachers.</p>
                </Col>
                <Col sm="4">
                    <h5 className="title">Links</h5>
                    <ul>
                    <li className="list-unstyled"><a href="#!">Home</a></li>
                    <li className="list-unstyled"><a href='https://pngtree.com/'>Graphics from pngtree.com</a></li>
                    </ul>
                </Col>
                </Row>
            </Container>
            <div className="footer-copyright text-center py-3" color="amber darken-1">
                <Container fluid>
                    &copy; {(new Date().getFullYear())} Copyright: <a href="https://www.zennajduke.com"> CreativeClassroom LLC </a>
                    </Container>
            </div>
    </Footer>
    );
    }
}

export default Foot;