import React, {Component} from 'react'
import { Button, MDBInput } from 'mdbreact';
import PropTypes from 'prop-types'
import {create} from './api-post.js'
import auth from '../auth/auth-helper.js'

class NewPost extends Component {
  
  state = {
    text: '',
    file: [],
    error: '',
    user: {}
  }

  componentDidMount = () => {
    this.postData = new FormData()
    this.setState({user: auth.isAuthenticated().user})
  }

  clickPost = () => {
    this.postData.append('text', this.state.text)
    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.postData).then((data) => {
      if (!data) {
        this.setState({error: "There was an error. Try again."})
      } else {
        this.setState({text:'', file: ''})
        this.props.addUpdate(data)
      }
    })
    window.location.href = window.location.href;
  }

  fileInputHandler = (event) => {
    let file = (event.target.files[0]);
    this.postData.append('File', file, file.name);
  };
    
  handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    this.setState({ [name]: value })
  }

  render() {
    return (
        <div>    
              <form action="/upload/photo" enctype="multipart/form-data" method="POST"> 
                <MDBInput onChange={this.handleChange('text')} label="Share your thoughts ..." value={this.state.text}/>
              </form>
              <output id="result" />
              <img alt= "..." src={this.state.file}/>
            { this.state.error && (<h5 component="p" color="error">
                  {this.state.error}
                </h5>)
            }
              <div className='float-right'>
                  <Button size="sm" disabled={this.state.text === ''} onClick={this.clickPost}>Post</Button>
              </div>
        </div>)
  }
}

NewPost.propTypes = {
  addUpdate: PropTypes.func.isRequired
}

export default NewPost;


//getValue={this.fileInputHandler}
