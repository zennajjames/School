import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import { Card, CardTitle, CardBody } from 'mdbreact';

import auth from '../auth/auth-helper'
import {listNewsFeed} from './api-post'
import NewPost from './NewPost.jsx'
import PostList from './PostList'

const styles = {
  heading: {
    fontWeight: 300
  }
}

class Newsfeed extends Component {
  state = {
      posts: []
  }
  loadPosts = () => {
    const jwt = auth.isAuthenticated()
    listNewsFeed({
      userId: jwt.user._id
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

  componentDidMount = () => {
    this.loadPosts()
  }

  addPost = (post) => {
    const updatedPosts = this.state.posts
    updatedPosts.unshift(post)
    this.setState({posts: updatedPosts})
  }

  removePost = (post) => {
    const updatedPosts = this.state.posts
    const index = updatedPosts.indexOf(post)
    updatedPosts.splice(index, 1)
    this.setState({posts: updatedPosts})
  }

  render() {
    // const {classes} = this.props
    return (
      <Card>
        <CardBody>
        <CardTitle style={styles.heading} type="title">Newsfeed</CardTitle>
        <hr />
        <PostList removeUpdate={this.removePost} posts={this.state.posts}/>
        <hr />
        <NewPost addUpdate={this.addPost}/>
        </CardBody>
      </Card>
    )
  }
}
// Newsfeed.propTypes = {
//   classes: PropTypes.object.isRequired
// }

export default Newsfeed;
