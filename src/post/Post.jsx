import React, {Component} from 'react'
import auth from '../auth/auth-helper'
import { Card, CardHeader, CardBody, CardFooter, Button, Fa, Container, Row, a, Collapse, Input } from 'mdbreact';

import {Link} from 'react-router-dom'
import {remove, like, unlike} from './api-post'
import Comments from './Comments'

const styles = {
  media: {
    maxHeight: 200,
    maxWidth: 200
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  card: {
    minWidth:500,
    maxWidth:600,
    margin: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    padding: 15
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
    console.log(this.props)
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
    return (
      <Container style={{maxWidth: '80%'}}>
        <Row>
          <Card style={styles.card}>
            <CardHeader>
              <ul className="list-inline">
                  <li className="list-inline-item">
                    <img style={styles.avatar} className="rounded-circle z-depth-1-half" src={'/api/users/photo/'+this.props.post.postedBy._id}/>
                  </li>
                  <li className="list-inline-item">
                    <a to={"/user/" + this.props.post.postedBy._id} className="name">{this.props.post.postedBy.name}</a>
                  </li>
                  <li className="list-inline-item">
                    <div className="grey-text" className="date">{(new Date(this.props.post.created)).toDateString()}</div>
                  </li>
                  {this.props.post.postedBy._id === auth.isAuthenticated().user._id &&
                  <li className="list-inline-item" >
                    <Fa icon="trash" onClick={this.deletePost}/>
                  </li>
                   }
              </ul>
            </CardHeader>
            <CardBody>
              <div className="added-text">{this.props.post.text}</div>
                {this.props.post.photo &&
                  (<div>
                    <img
                      style={styles.media} src={'/api/posts/photo/'+this.props.post._id}
                      />
              </div>)}
            </CardBody>
            <CardFooter>
              { this.state.like
                ? <a>
                      <Fa icon="heart" onClick={this.like} color="red" aria-label="Like"/>
                      <span>    {this.state.likes}</span>
                  </a>
                : <a>
                      <Fa icon="heart" onClick={this.like} aria-label="Unlike"/>
                      <span>    {this.state.likes}</span>
                  </a>
                } 
              <a>
              <a className="comment" aria-expanded="false" aria-controls="collapseExample-1" onClick={this.toggle}>Comment </a> &middot; <span><a>{this.state.comments.length}</a></span>
              </a>
            <Collapse id="collapseExample-1" isOpen={this.state.collapse}>
              <Card className="card-body mt-1">
                <Comments postId={this.props.post._id} comments={this.state.comments} updateComments={this.updateComments}/>
                <input type="textarea" label="Add comment"/>
                <div className="d-flex justify-content-end">
                  <Button onClick={this.toggle}>Cancel</Button>
                </div>
              </Card>
            </Collapse>
            </CardFooter>
        </Card>
      </Row>
    </Container>
    )
  }
}

export default Post;
