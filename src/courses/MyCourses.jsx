import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Row, Col, Fa, CardText, TabPane, TabContent, Nav, NavItem, NavLink } from 'mdbreact';
import auth from '../../auth/auth-helper.js'
import {read} from '../api-user'
import { Redirect } from 'react-router-dom'
import classnames from 'classnames';

import FollowGrid from './FollowGrid'
import CourseGrid from '../../courses/CourseGrid'
import PostList from '../../post/PostList'
import FindPeople from './FindPeople.jsx'   
import DeleteUser from './DeleteUser'
import FollowProfileButton from '../FollowProfileButton'
import Enroll from './Enroll.jsx'   

import {listByUser} from '../../post/api-post'
import {listCoursesByUser} from '../../courses/api-course'

const styles = {
  bigAvatar: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 50
  },
  heading: {
    fontWeight: 300,
    color: "white"
  },
  followGrid: {
    borderWidth: .5,
    borderColor:  'rgba(214, 214, 214, 0.4)',
    borderStyle: 'groove',
    padding: 10,
    margin:15
  }

}
class MyCourses extends React.Component {
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

  loadPosts = (user) => {
    const jwt = auth.isAuthenticated()
    listByUser({
      userId: user
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({posts: data})
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
    const joined = (new Date(this.state.user.created)).toDateString();
    const photoUrl = this.state.user._id
              ? `/api/users/photo/${this.state.user._id}?${new Date().getTime()}`
              : '/api/users/defaultphoto'
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
                      <h3>About</h3>
                      <img alt="profilePic" src={photoUrl} style={styles.bigAvatar}/>
                      <h4 style={styles.heading}>{this.state.user.name}</h4>
                      <CardText>{this.state.user.email}</CardText>
                      <CardText>Joined: {joined}</CardText>
                      {
                      auth.isAuthenticated().user && auth.isAuthenticated().user._id === this.state.user._id
                      ? (
                        <div>
                          <a href={"/user/edit/" + this.state.user._id}>
                          <Fa icon="edit"/>
                          </a>
                          <DeleteUser userId={this.state.user._id}/>             
                        </div>    
                      )
                      : (<FollowProfileButton following={this.state.following} onButtonClick={this.clickFollowButton}/>)
                        }         
                      <h4 style={styles.heading}>{this.state.user.about}</h4>
                </TabPane>
                <TabPane tabId="2">
                  <h3>Courses</h3>
                  <CourseGrid userId={this.state.user._id} courses={this.state.courses}/>
                  <Enroll userId={this.state.user._id}/>
                </TabPane>
                <TabPane tabId="3">
                <h3>Posts</h3>
                  <PostList removeUpdate={this.removePost} posts={this.state.posts}/> 
                </TabPane>
                <TabPane tabId="4">
                <h3>Friends</h3>
                <hr />
                <div style={styles.followGrid}>
                  <h5>Following</h5>
                  <FollowGrid people={this.state.user.following}/>
                </div>
                <div style={styles.followGrid}>
                  <h5>Followers</h5>
                  <FollowGrid people={this.state.user.followers}/>
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
      <Container>
        <section className="text-center my-5">
          <h2 className="white-text h1-responsive font-weight-bold my-5">Our Most Popular Courses</h2>
          <p className="white-text w-responsive mx-auto mb-5">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit est laborum.</p>
          <Row className="text-center">
            <Col lg="4" md="12" className="mb-lg-0 mb-4">
              <View className="overlay rounded z-depth-1" waves>
                <img src="https://mdbootstrap.com/img/Photos/Others/images/58.jpg" alt="course" className="img-fluid"/>
                <a>
                  <Mask overlay="white-slight"/>
                </a>
              </View>
              <CardBody className="pb-0">
                <h4 className="font-weight-bold my-3">Composition I</h4>
                <Button href="/composition" color="indigo" size="sm"><Fa icon="clone" className="left"/> View Course</Button>
              </CardBody>
            </Col>
            <Col lg="4" md="12" className="mb-lg-0 mb-4">
              <View className="overlay rounded z-depth-1" waves>
                <img src="https://mdbootstrap.com/img/Photos/Others/project4.jpg" alt="course" className="img-fluid"/>
                <a>
                  <Mask overlay="white-slight"/>
                </a>
              </View>
              <CardBody className="pb-0">
                <h4 className="font-weight-bold my-3">A New Approach To Color</h4>
                <p className="grey-text">Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae.</p>
                <Button color="indigo" size="sm"><Fa icon="clone" className="left"/> View Course</Button>
              </CardBody>
            </Col>
            <Col lg="4" md="12" className="mb-lg-0 mb-4">
              <View className="overlay rounded z-depth-1" waves>
                <img src="https://mdbootstrap.com/img/Photos/Others/images/88.jpg" alt="course" className="img-fluid"/>
                <a>
                  <Mask overlay="white-slight"/>
                </a>
              </View>
              <CardBody className="pb-0">
                <h4 className="font-weight-bold my-3">Design I: Your Visual Language</h4>
                <p className="grey-text">Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae.</p>
                <Button color="indigo" size="sm"><Fa icon="clone" className="left"/> View Course</Button>
              </CardBody>
            </Col>
          </Row>
        </section>
      </Container>
    </Router>

    
    );
  }
}

export default MyCourses;