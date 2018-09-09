import React, {Component} from 'react'
import auth from '../auth/auth-helper'

import { Card, CardTitle, Input, Fa } from 'mdbreact';

import {comment, uncomment} from './api-post'
import {Link} from 'react-router-dom'

const styles = {
  smallAvatar: {
    width: 25,
    height: 25
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
    if(event.keyCode == 13 && event.target.value){
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
        <p style={styles.commentText}>
          <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link><br/>
          {item.text}
          <span style={styles.commentDate}>
            {(new Date(item.created)).toDateString()} |
            {auth.isAuthenticated().user._id === item.postedBy._id &&
              <Fa icon="trash" onClick={this.deleteComment(item)} style={styles.commentDelete}/> }
          </span>
        </p>
      )
    }

    return (<Card>
              <CardTitle>
                  <img style={styles.smallAvatar} src={'/api/users/photo/'+auth.isAuthenticated().user._id}/>
              </CardTitle>
              <input
                onKeyDown={this.addComment}
                value={this.state.text}
                onChange={this.handleChange('text')}
                placeholder="Write something ..."
                />

              { this.props.comments.map((item, i) => {
                  return <div key={i}>
                    <CardTitle>
                      <img style={styles.smallAvatar} src={'/api/users/photo/'+item.postedBy._id}/>
                      <p>{commentBody(item)}</p>
                    </CardTitle>
                  </div>  })}
            </Card>)
    }
  }
// Comments.propTypes = {
//   classes: PropTypes.object.isRequired,
//   postId: PropTypes.string.isRequired,
//   comments: PropTypes.array.isRequired,
//   updateComments: PropTypes.func.isRequired
// }

export default Comments;
