import React, {Component} from 'react'
import auth from '../auth/auth-helper'
import PropTypes from 'prop-types'

import { Button, Card, CardBody, CardFooter, Input, Fa } from 'mdbreact';

import {comment, uncomment} from './api-post'
import {Link} from 'react-router-dom'

const styles = {
  smallAvatar: {
    width: 35,
    height: 35,
    margin:10
  },
  commentField: {
    width: '96%'
  },
  commentText: {
    backgroundColor: 'white',
    padding: 2,
  },
  commentDate: {
    display: 'block',
    color: 'gray',
    fontSize: '0.8em'
 },
 commentDelete: {
   fontSize: '1.6em',
   verticalAlign: 'middle',
   cursor: 'pointer'
 }
}
class Comments extends Component {
  
  state = {text: ''}
  
  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }
  
  addComment = (event) => {
    if(event.keyCode === 13 && event.target.value){
      event.preventDefault()
      const jwt = auth.isAuthenticated()
      comment({
        userId: jwt.user._id
      }, {
        t: jwt.token
      }, this.props.postId, {text: this.state.text}).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          this.setState({text: ''})
          this.props.updateComments(data.comments)
        }
      })
    }
  }

    
  reply = (event) => {
      event.preventDefault()
      const jwt = auth.isAuthenticated()
      console.log(this.state.text)
      comment({
        userId: jwt.user._id
      }, {
        t: jwt.token
      }, this.props.postId, {text: this.state.text}).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          this.setState({text: ''})
          this.props.updateComments(data.comments)
        }
      })
    }
  

  deleteComment = comment => event => {
    const jwt = auth.isAuthenticated()
    uncomment({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.props.postId, comment).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.props.updateComments(data.comments)
      }
    })
  }

  render() {
    const commentBody = item => {
      return (
        <div>
          <div className="d-inline-flex p-2">
               <img className="rounded-circle z-depth-1-half" style={styles.smallAvatar} src={'/api/users/photo/'+item.postedBy._id} alt="profilePic"/>
              <Link className="align-self-end" to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link>&nbsp;
              <span className="align-self-end" style={styles.commentDate}>
                {(new Date(item.created)).toDateString()}&emsp;&emsp;
                {auth.isAuthenticated().user._id === item.postedBy._id &&
                  <Fa className="float-right" icon="trash" onClick={this.deleteComment(item)} style={styles.commentDelete}/> }
              </span>
          </div>
          <p style={styles.commentText}>{item.text}</p>
          <br/>
        </div>
      )
    }

    return (<Card>
              <CardBody>
                <div className="d-flex-inline">
                  <img className="rounded-circle z-depth-1-half p-2" style={styles.smallAvatar} alt="profilePic" src={'/api/users/photo/'+auth.isAuthenticated().user._id}/>
                  <Input
                      className="p-2"
                      id="commentForm"
                      onKeyDown={this.addComment}
                      value={this.state.text}
                      onChange={this.handleChange('text')}
                      label="Write something ..."
                      />
                </div>
                <div className="float-right">
                  <Button size="sm" onClick={this.reply}>Reply</Button>
                  <Button size="sm" onClick={this.props.toggle}>Cancel</Button>
                </div>
              </CardBody>
              <CardFooter>
              { this.props.comments.map((item, i) => {
                    return <div key={i}>
                            <div style={styles.commentText}>{commentBody(item)}</div>
                    </div>  })}
              </CardFooter>
          </Card>)
    }
  }

Comments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  updateComments: PropTypes.func.isRequired
}

export default Comments;
