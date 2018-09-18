import Vimeo from '@u-wave/react-vimeo';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Row, Col, TabPane, TabContent, Nav, NavItem, NavLink } from 'mdbreact';
import auth from '../../auth/auth-helper.js'
import {read} from '../api-user'
import { Redirect } from 'react-router-dom'
import classnames from 'classnames';

import {read} from '../api-course'

const styles = {
  bigAvatar: {
    width: 85,
    height: 85,
    margin: 10,
    borderRadius: 50
  },
  heading: {
    fontWeight: 300,
  },
  followGrid: {
    borderWidth: .5,
    borderColor:  'rgba(214, 214, 214, 0.4)',
    borderStyle: 'groove',
    padding: 10,
    margin:15
  },
  badge: {
    padding:8,
    margin: 5
  }
}
class CourseDashboard extends React.Component {
  constructor({match}) {
    super();

    this.toggleClassicTabs1 = this.toggleClassicTabs1.bind(this);
    this.state = {
      activeItemClassicTabs1: '1', 
      title: '',
      id: '',
      description: '',
      redirectToSignin: false,
      posts: []
    };
    this.match = match
  }

  componentDidMount = () => {
    console.log(this.props)
    this.userData = new FormData()
    console.log(this.userData)
    const jwt = auth.isAuthenticated()
    read({
      userId: this.props.match.params.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({id: data._id, name: data.name, email: data.email, about: data.about})
      }
    })
  }

  componentWillReceiveProps = (props) => {
    console.log(this.props)
    this.init(props.match.params.userId)
  }

  componentDidMount = () => {
    this.init(this.match.params.userId)
  }

  toggleClassicTabs1(tab) {
    if (this.state.activeItemClassicTabs1 !== tab) {
      this.setState({
        activeItemClassicTabs1: tab,
      });
    }
  }

  render() {

    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <Router>
        <Container>
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
                      <h3 className="d-inline">About</h3>
                      <hr />
                      <Row className="text-center">
                      <Col>
                        <div className="text-center">
                          <Vimeo video="288973599" autoplay />    
                        </div>
                      </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                  <h3>Lesson Two</h3>
                  <hr />
                </TabPane>
                <TabPane tabId="3">
                <h3>Lesson Two</h3>
                <hr />
                </TabPane>
                <TabPane tabId="4">
                <h3>Friends</h3>
                <hr />
                <div style={styles.followGrid}>
                  <h5>Following</h5>
                </div>
                <div style={styles.followGrid}>
                  <h5>Followers</h5>
                </div>
                </TabPane>
                <TabPane tabId="5">
                <h3>Classmates</h3>
                </TabPane>
              </TabContent>
            </div>
          </Col>
        </Row>
      </Container>
    </Router>
    );
  }
}

export default CourseDashboard;



    // const joined = moment(new Date(this.state.user.created)).format("LL")
    // const photoUrl = this.state.course._id
    //           ? `/api/users/photo/${this.state.user._id}?${new Date().getTime()}`
    //           : '/api/users/defaultphoto'
    // const userId = this.state.user._id
