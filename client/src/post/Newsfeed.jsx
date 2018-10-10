import React, {Component} from 'react'

import auth from '../auth/auth-helper'
import {listNewsFeed} from './api-post'
import NewPost from './NewPost.jsx'
import PostList from './PostList'
import Modal from '../core/Modal'

const styles = {
  heading: {
    fontWeight: 400,
    color: "black",
    paddingTop: "1.5rem",
    paddingLeft: "1rem",
    fontFamily: "benton-sans"
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
      if (!data) {
        console.log("No response!")
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
        <div className="d-inline-block">
          <h4 style={styles.heading} type="title">Newsfeed</h4>
        </div>
        <div className="d-inline-block float-right">
          <Modal header={"Post"} closeButton={"Done"} openButton={"Post"} body={<NewPost addUpdate={this.addPost}/>}/>
        </div>
        <hr style={{width: "80%"}} />
          <PostList removeUpdate={this.removePost} posts={this.state.posts}/>
      </div>
    )
  }
}


export default Newsfeed;
