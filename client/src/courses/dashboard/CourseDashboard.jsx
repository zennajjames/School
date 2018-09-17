import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Row, Badge, Col, Fa, TabPane, TabContent, Nav, NavItem, NavLink } from 'mdbreact';
import { Redirect } from 'react-router-dom'

import auth from '../../auth/auth-helper.js'
import {read} from '../../user/api-user'
import {list} from '../api-course'

import classnames from 'classnames';
import moment from 'moment'

import FollowGrid from './FollowGrid.js'
import CourseGrid from '../CourseGrid.js'
import PostList from '../../post/PostList.js'


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
      user: {following:[], followers:[]},
      courses: [],
      redirectToSignin: false,
      following: false,
      posts: []
    };
    this.match = match
  }

  init = (userId) => {
    const jwt = auth.isAuthenticated()
    read({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      console.log(data)
      if (data.error) {
        this.setState({redirectToSignin: true})
      } else {
        let following = this.checkFollow(data)
        this.setState({user: data, following: following, courses: data.courses})
        console.log(this.state.user)
        this.loadPosts(data._id)
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

  checkFollow = (user) => {
    const jwt = auth.isAuthenticated()
    const match = user.followers.find((follower)=> {
      return follower._id === jwt.user._id
    })
    return match
  }

  clickFollowButton = (callApi) => {
    const jwt = auth.isAuthenticated()
    callApi({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.state.user._id).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({user: data, following: !this.state.following})
      }
    })
  }

  loadCourses = (user) => {
    const jwt = auth.isAuthenticated()
    listByUser({
      userId: user
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({courses: data})
      }
    })
  }

  removePost = (post) => {
    const updatedPosts = this.state.posts
    const index = updatedPosts.indexOf(post)
    updatedPosts.splice(index, 1)
    this.setState({posts: updatedPosts})
  }

  toggleClassicTabs1(tab) {
    if (this.state.activeItemClassicTabs1 !== tab) {
      this.setState({
        activeItemClassicTabs1: tab,
      });
    }
  }

  render() {
    const joined = moment(new Date(this.state.user.created)).format("LL")
    const photoUrl = this.state.user._id
              ? `/api/users/photo/${this.state.user._id}?${new Date().getTime()}`
              : '/api/users/defaultphoto'
    const userId = this.state.user._id
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
                      Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '2' })} onClick={() => { this.toggleClassicTabs1('2'); }}>
                      Courses
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '3' })} onClick={() => { this.toggleClassicTabs1('3'); }}>
                      Posts
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '4' })} onClick={() => { this.toggleClassicTabs1('4'); }}>
                      Classmates
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="#" className={classnames({ active: this.state.activeItemClassicTabs1 === '5' })} onClick={() => { this.toggleClassicTabs1('5'); }}>
                      Connections
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent className="card" activeItem={this.state.activeItemClassicTabs1}>
                  <TabPane tabId="1">
                      <h3 className="d-inline">About</h3>
                        {
                        auth.isAuthenticated().user && auth.isAuthenticated().user._id === this.state.user._id
                        ? (
                          <div className="d-inline">
                            <Badge style={styles.badge} tag="a" href={"/course/edit/" + this.state.courses._id} className="d-inline float-right align-self-end">
                                <Fa icon="edit"/>Edit Course&nbsp;
                            </Badge>&nbsp;
                          </div>
                        )
                        : (<div className="d-inline float-right">
                                                    </div>
                        )}  
                      <hr />
                      <Row>
                        <Col>
                            <img className="z-depth-1-half" alt="profilePic" src={photoUrl} style={styles.bigAvatar}/>                   
                        </Col>
                        <Col className="col-9">
                            <div className="float-left">
                              <h4 style={styles.heading}>{this.state.courses.title}</h4>
                              <h5><Badge tag="a" href={"mailto:"+this.state.user.email} color="info">{this.state.user.email}</Badge></h5>
                              <p className="grey-text">{this.state.courses.description}</p>   
                            </div>
                        </Col>
                      </Row>
                </TabPane>
                <TabPane tabId="2">
                  <h3>Courses</h3>
                  <hr />
                  <CourseGrid userId={userId} courses={this.state.courses}/>
                </TabPane>
                <TabPane tabId="3">
                <h3>Posts</h3>
                <hr />
                  <PostList removeUpdate={this.removePost} posts={this.state.posts}/> 
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
                  <FindPeople/>
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