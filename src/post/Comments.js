import React, {Component} from 'react'
import auth from '../auth/auth-helper'

import { CardTitle, Input, Fa } from 'mdbreact';

import {comment, uncomment} from './api-post'
import {Link} from 'react-router-dom'

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
    // const {classes} = this.props
    const commentBody = item => {
      return (
        <p>
          <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link><br/>
          {item.text}
          <span>
            {(new Date(item.created)).toDateString()} |
            {auth.isAuthenticated().user._id === item.postedBy._id &&
              <Fa onClick={this.deleteComment(item)}/> }
          </span>
        </p>
      )
    }

    return (<div>
        <CardTitle
              avatar={
                <img src={'/api/users/photo/'+auth.isAuthenticated().user._id}/>
              }
              title={ 
              <Input
                onKeyDown={this.addComment}
                value={this.state.text}
                onChange={this.handleChange('text')}
                placeholder="Write something ..."
                />}
        />
        { this.props.comments.map((item, i) => {
            return <CardTitle
                      avatar={
                        <img src={'/api/users/photo/'+item.postedBy._id}/>
                      }
                      title={commentBody(item)}
                      key={i}/>
              })
        }
    </div>)
  }
}

// Comments.propTypes = {
//   classes: PropTypes.object.isRequired,
//   postId: PropTypes.string.isRequired,
//   comments: PropTypes.array.isRequired,
//   updateComments: PropTypes.func.isRequired
// }

export default Comments;
