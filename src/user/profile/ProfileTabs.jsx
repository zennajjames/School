import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TabPane, TabContent, Nav, NavItem, NavLink, Row, Col, Container } from 'mdbreact';
import classnames from 'classnames';

class ProfileTabs extends React.Component {

    state = {
      activeItem: '1'
    };
  
  toggle = (tab) => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  }
  render() {
    return (
      <Router>
        <Container>
          <Nav tabs className="nav-justified">
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeItem === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
              Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeItem === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Follow
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeItem === '3' })}
                onClick={() => { this.toggle('3'); }}
              >
                Contact
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeItem={this.state.activeItem}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                <br />
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus
                      reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione
                      porro voluptate odit minima.</p>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <br />
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus
                      reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione
                      porro voluptate odit minima.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus
                      reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione
                      porro voluptate odit minima.</p>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <br />
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil odit magnam minima, soluta doloribus
                      reiciendis molestiae placeat unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat ratione
                      porro voluptate odit minima.</p>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Container>
      </Router>
    );
  }
}

export default ProfileTabs;