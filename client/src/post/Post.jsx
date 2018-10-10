import React, {Component} from 'react'
import auth from '../auth/auth-helper'
import {Fa, Collapse, Badge } from 'mdbreact';
import moment from 'moment'

import {remove, like, unlike} from './api-post'
import Comments from './Comments'

const styles = {
  media: {
    maxHeight: 200,
    maxWidth: 200
  },
  avatar: {
    maxWidth: 70,
    maxHeight: 90,
    borderRadius: 50,
  },
  card: {
    minWidth:500,
    maxWidth:600,
    margin: 20,
    // backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  container: {
    maxWidth: '80%',
    marginLeft: 20
  }
}

class Post extends Component {
  state = {
    like: false,
    likes: 0,
    comments: [],
    collapse: false,
  }

  componentDidMount = () => {
    this.setState({like:this.checkLike(this.props.post.likes), likes: this.props.post.likes.length, comments: this.props.post.comments})
  }

  componentWillReceiveProps = (props) => {
    this.setState({like:this.checkLike(props.post.likes), likes: props.post.likes.length, comments: props.post.comments})
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  checkLike = (likes) => {
    const jwt = auth.isAuthenticated()
    let match = likes.indexOf(jwt.user._id) !== -1
    return match
  }

  like = () => {
    let callApi = this.state.like ? unlike : like
    const jwt = auth.isAuthenticated()
    callApi({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.props.post._id).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({like: !this.state.like, likes: data.likes.length})
      }
    })
  }

  updateComments = (comments) => {
    this.setState({comments: comments})
  }

  deletePost = () => {
    const jwt = auth.isAuthenticated()
    remove({
      postId: this.props.post._id
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.props.onRemove(this.props.post)
      }
    })
  }

  render() {
    console.log(this.props)
    if (this.props.post.photo) {
      console.log("There is a photo!")
    }
    else {
      console.log("No photos.")
    }
    return (

          <div className="mdb-feed">
            <div style={styles.card} className="news">
              <div className="label">
                <img src={'/api/users/photo/'+this.props.post.postedBy._id} alt="profilePic" style={{maxWidth: "60px", WebkitFilter: 'drop-shadow(1px 1px 1px #8a8a8a)', filter: 'drop-shadow(1px 1px 1px #4d4d4d)', paddingBottom: 5, borderRadius: "50%"}}/>  
              </div>
              <div className="excerpt">
                <div className="brief">
                  <div className="d-inline-flex">
                    <a className="name text-info d-inline mr-2" to={"/users/" + this.props.post.postedBy._id}>{this.props.post.postedBy.name}</a>
                    { this.props.post.postedBy.role === "Teacher"
                      ?(<h6><Badge className="d-inline" color="amber darken-2" pill><Fa icon="star-o" aria-hidden="true"/></Badge></h6>)
                      : (<div></div>)
                      }
                  </div>
                  <div className="date">{moment(new Date(this.props.post.created)).calendar()}</div>
                </div>
                <div className="added-text">{this.props.post.text}</div>
                <div className="added-images">
                {this.props.post.photo &&
                    (<div>
                        <img className="z-depth-1 rounded mb-md-0 mb-2" alt="post-photos" src={'/api/posts/photo/'+this.props.post._id}/>
                    </div>
                    )}
                </div>

                <div className="feed-footer">

                  <a className="comment" aria-expanded="false" onClick={this.toggle}>Comments</a> 
                  &nbsp;
                    <span>
                      <a>{this.state.comments.length}</a>
                    </span>
                  &emsp;
                  { this.state.like
                  ? <a className="like">
                        <i className="fa fa-heart" aria-label="Like" onClick={this.like}></i>
                    <span>{this.state.likes}</span>   
                    </a>
                  : <a className="like">
                          <i className="fa fa-heart" aria-label="Unlike" onClick={this.like}></i>
                        <span>{this.state.likes}</span> 
                    </a>
                  } 
                  &emsp;
                  {this.props.post.postedBy._id === auth.isAuthenticated().user._id &&
                      <Fa className="comment" icon="trash" onClick={this.deletePost}/>
                    }
                  <Collapse id="collapseComment" isOpen={this.state.collapse}>
                    <div className="card-body mt-1">
                      <Comments toggle={this.toggle} postId={this.props.post._id} comments={this.state.comments} updateComments={this.updateComments}/>
                    </div>
                  </Collapse>
                </div>
              </div>
            </div>
        </div>
  )
  }
}

export default Post;


// {this.props.post.photos.map((photo, i) => { 