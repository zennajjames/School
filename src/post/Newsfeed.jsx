import React, {Component} from 'react'

import auth from '../auth/auth-helper'
import {listNewsFeed} from './api-post'
import NewPost from './NewPost.jsx'
import PostList from './PostList'
import { Card } from 'mdbreact';


const styles = {
  heading: {
    fontWeight: 400,
    color: "white"
  },
  // postList: {
  //   backgroundColor: 'rgba(214, 214, 214, 0.4)',
  //   padding: 20
  // }
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
    return (
      <div>
        <span>
          <h3 style={styles.heading} type="title">Newfeed</h3>
          <NewPost addUpdate={this.addPost}/>
        </span>
        <hr />
        <Card>
          <PostList removeUpdate={this.removePost} posts={this.state.posts}/>
        </Card>
      </div>
    )
  }
}


export default Newsfeed;
