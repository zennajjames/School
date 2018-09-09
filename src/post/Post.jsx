import React, {Component} from 'react'
import auth from '../auth/auth-helper'
import { Button, Fa, Card, CardBody, CardTitle, CardImage, CardFooter, CardHeader } from 'mdbreact';

import {Link} from 'react-router-dom'
import {remove, like, unlike} from './api-post'
import Comments from './Comments'

const styles = {
  media: {
    maxHeight: 100,
    maxWidth: 100
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 10
  }
}

class Post extends Component {
  state = {
    like: false,
    likes: 0,
    comments: []
  }

  componentDidMount = () => {
    console.log(this.props)
    this.setState({like:this.checkLike(this.props.post.likes), likes: this.props.post.likes.length, comments: this.props.post.comments})
  }

  componentWillReceiveProps = (props) => {
    this.setState({like:this.checkLike(props.post.likes), likes: props.post.likes.length, comments: props.post.comments})
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
    return (
      <Card>
        <CardHeader>
              <CardImage style={styles.avatar} src={'/api/users/photo/'+this.props.post.postedBy._id}/>
            <p>{this.props.post.postedBy._id === auth.isAuthenticated().user._id}
                <Fa icon="trash" onClick={this.deletePost}/>
            </p>
            <h4>
              <Link to={"/user/" + this.props.post.postedBy._id}>{this.props.post.postedBy.name}</Link>
            </h4>
            <h5>{(new Date(this.props.post.created)).toDateString()}</h5>
        </CardHeader>
        <CardBody>
          <h5 component="p">
            {this.props.post.text}
          </h5>
          {this.props.post.photo &&
            (<div>
              <CardImage
                style={styles.media} src={'/api/posts/photo/'+this.props.post._id}
                />
            </div>)}
        </CardBody>
        <CardFooter>
          { this.state.like
            ? <Button>
                  <Fa icon="heart" onClick={this.like} aria-label="Like"/>
                  <span>    {this.state.likes}</span>
              </Button>
            : <Button>
                  <Fa icon="heart" onClick={this.like} aria-label="Unlike"/>
                  <span>    {this.state.likes}</span>
              </Button>
            } 
            <Button>
              <Fa icon="comment" aria-label="Comment"/>
              <span>    {this.state.comments.length}</span>
            </Button>
        </CardFooter>
        <Comments postId={this.props.post._id} comments={this.state.comments} updateComments={this.updateComments}/>
      </Card>
    )
  }
}

// Post.propTypes = {
//   classes: PropTypes.object.isRequired,
//   post: PropTypes.object.isRequired,
//   onRemove: PropTypes.func.isRequired
// }

export default Post;
