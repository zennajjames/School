import React, {Component} from 'react'
import { Badge, Button, Fa, Collapse,Card, CardBody, CardHeader, Input } from 'mdbreact';

import {create} from './api-post.js'
import auth from '../auth/auth-helper.js'

class NewPost extends Component {
  
  state = {
    text: '',
    photo: '',
    error: '',
    user: {},
    collapse: false,
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  componentDidMount = () => {
    this.postData = new FormData()
    this.setState({user: auth.isAuthenticated().user})
  }

  clickPost = () => {
    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.postData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({text:'', photo: ''})
        this.props.addUpdate(data)
      }
    })
  }

  handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    this.postData.set(name, value)
    this.setState({ [name]: value })
  }
  render() {
    // const {classes} = this.props
    return (
    <div>
      <h3 className="float-right"><Badge color="cyan" onClick={this.toggle} style={{ marginBottom: "1rem" }}>Post</Badge></h3>
      <Collapse isOpen={this.state.collapse}>
          <Card>
          <CardHeader avatar={ <img alt="profilePic" src={'/api/users/photo/'+this.state.user._id}/>} title={this.state.user.name}/>
          <CardBody>
            <Input
                hint="Share your thoughts ..."
                value={this.state.text}
                onChange={this.handleChange('text')}
            />
            <input accept="image/*" onChange={this.handleChange('photo')} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
              <Fa icon="camera"></Fa>
            </label> 
            
            {/* <span>
              {this.state.photo ? this.state.photo.name : ''}
            </span> */}

            { this.state.error && (<h5 component="p" color="error">
                  {this.state.error}
                </h5>)
            }
          </CardBody>
            <Button color="primary" variant="raised" disabled={this.state.text === ''} onClick={this.clickPost}>POST</Button>
        </Card>
      </Collapse>
  </div>)
  }
}

// NewPost.propTypes = {
//   classes: PropTypes.object.isRequired,
//   addUpdate: PropTypes.func.isRequired
// }

export default NewPost;
