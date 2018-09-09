import React, {Component} from 'react'
import { Container, Fa, Card, CardBody, CardText, CardTitle, ListGroup, ListGroupItem } from 'mdbreact';

import DeleteUser from './DeleteUser'
import auth from '../../auth/auth-helper'
import {read} from '../api-user'
import {Redirect, Link} from 'react-router-dom'
import FollowProfileButton from '../FollowProfileButton'
// import Tabs from './Tabs.jsx'
import {listByUser} from '../../post/api-post'

const styles = {
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10
  },
  heading: {
    fontWeight: 300
  }
}

class Profile extends Component {
  constructor({match}) {
    super()
   this.state = {
      user: {following:[], followers:[]},
      redirectToSignin: false,
      following: false,
      posts: []
    }
    this.match = match
  }
  
  init = (userId) => {
    const jwt = auth.isAuthenticated()
    read({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true})
      } else {
        let following = this.checkFollow(data)
        this.setState({user: data, following: following})
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
      <Container>
        <Card>
          <CardBody>
          <h2 style={styles.heading}>
            Profile
          </h2>
          <ListGroup>
            <ListGroupItem>
                <img alt="profilePic" src={photoUrl} style={styles.bigAvatar}/>
                <ul className="list-inline">
                  <li className="list-inline-item">
                      <h4 style={styles.heading}>
                      {this.state.user.name}
                      </h4>
                  </li>
                  <li className="list-inline-item">
                    <CardText> 
                      {this.state.user.email}
                    </CardText>
                  </li>
                </ul>
                <CardText>Joined: {joined}</CardText>
                  {
             auth.isAuthenticated().user && auth.isAuthenticated().user._id == this.state.user._id
             ? (
              <ul className="list-inline">
                  <li className="list-inline-item">
                    <Link to={"/user/edit/" + this.state.user._id}>
                    <Fa icon="edit"/>
                    </Link>
                  </li>
                  <li className="list-inline-item">    
                    <DeleteUser userId={this.state.user._id}/>                 
                  </li>
              </ul> )
            : (<FollowProfileButton following={this.state.following} onButtonClick={this.clickFollowButton}/>)
          }
            </ListGroupItem>
            <ListGroupItem>
              <h4 style={styles.heading}>About: {this.state.user.about}</h4>
            </ListGroupItem>
          </ListGroup>
          {/* <Tabs/> */}
          </CardBody>
        </Card>
      </Container>
    )
  }
}


export default Profile;

// {
//   auth.isAuthenticated().user && auth.isAuthenticated().user._id === this.state.user._id
//   ? (