import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarNav, NavItem, NavLink, NavbarToggler, Collapse, Mask, Row, Col, Fa, Button, View, Container } from 'mdbreact';
import './Home.css'

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start"
}

class HomeVid extends React.Component {
  constructor(props) {
    super(props),
    this.state = {
      collapse : false
    }
    this.onClick = this.onClick.bind(this);
    this.handleNavbarClick = this.handleNavbarClick.bind(this);
  }

  onClick(){
    this.setState({
        collapse: !this.state.collapse,
    });
  }

  handleNavbarClick(){
    this.setState({
      collapse: false
    });
  }
  render(){
  const overlay = <div id="sidenav-overlay" style={{backgroundColor: 'transparent'}} onClick={this.handleNavbarClick}/>
    return (
      <div id="videobackground">
        <Router>
          <div>
            <Navbar dark expand="md" fixed="top" scrolling>
              <Container>
                <NavbarBrand>
                  <span className="white-text">Navbar</span>
                </NavbarBrand>
                <NavbarToggler onClick = { this.onClick } />
                <Collapse isOpen = {this.state.collapse} navbar>
                  <NavbarNav left>
                    <NavItem>
                      <NavLink to="#!">Home</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="#!">About</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="#!">Features</NavLink>
                    </NavItem>
                  </NavbarNav>
                  <NavbarNav right >
                    <NavItem>
                      <NavLink to="!#">
                        <Fa icon="facebook"></Fa>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="!#">
                        <Fa icon="twitter"></Fa>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="!#">
                        <Fa icon="instagram"></Fa>
                      </NavLink>
                    </NavItem>
                  </NavbarNav>
                </Collapse>
              </Container>
            </Navbar>
          { this.state.collapse && overlay}
          </div>
        </Router>

        <View>
          <video className="video-intro" poster="https://mdbootstrap.com/img/Photos/Others/background.jpg" playsInline autoPlay muted="" loop>
            <source src="https://mdbootstrap.com/img/video/animation.mp4" type="video/mp4"/>
          </video>
          <Mask className="d-flex justify-content-center align-items-center gradient">
            <Container className="px-md-3 px-sm-0">
              <Row>
                <Col md="12" className="mb-4 white-text text-center">
                    <h3 className="display-3 font-weight-bold mb-0 pt-md-5">School </h3>
                    <hr className="hr-light my-4 w-75"/>
                    <h4 className="subtext-header mt-2 mb-4">An online learning community.</h4>
                    <Button outline rounded color="white"><Fa icon="home"/> Log In</Button>
                </Col>
              </Row>
            </Container>
          </Mask>
        </View>
          <div color="grey lighten-5" className="footer-copyright text-center py-3">
                  <Container fluid>
                          &copy; {(new Date().getFullYear())} Copyright: <a href="https://www.zennajduke.com"> CreativeClassroom.com </a>
                  </Container>
          </div>
      </div>
    );
  }
};

export default HomeVid;