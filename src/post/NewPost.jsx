import React, {Component} from 'react'
import { Badge, Button, Collapse,Card, CardBody, CardHeader, CardFooter, Input, InputFile } from 'mdbreact';
import PropTypes from 'prop-types'
import {create} from './api-post.js'
import auth from '../auth/auth-helper.js'

const styles = {
  media: {
    maxHeight: 200,
    maxWidth: 200
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50, 
    marginRight: 15
  },
  input: {
    margin: 0
  }
}

class NewPost extends Component {
  
  state = {
    text: '',
    photos: [],
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
    console.log("made it")
    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.postData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({text:'', photos: []})
        console.log(this.state.photos)
        this.props.addUpdate(data)
      }
    })
  }

  handleChange = name => event => {
    const value = name === 'photos'
      ? event.target.files[0]
      : event.target.value
    this.postData.set(name, value)
    this.setState({ [name]: value })
    console.log(event.target.files)
  }
  render() {
    return (
    <div>
      <h3><Badge color="amber darken-3" onClick={this.toggle} style={{ marginBottom: "1rem" }}>Post</Badge></h3>
      <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardHeader className="d-flex flex-row">
              <img className="rounded-circle z-depth-1-half" style={styles.avatar} alt="profilePic" src={'/api/users/photo/'+this.state.user._id}/>
              <Input style={styles.input} hint="Share your thoughts ..." value={this.state.text}
                  onChange={this.handleChange('text')}/>  
            </CardHeader>
            <CardBody>
              <input multiple accept="image/*" onChange={this.handleChange('photos')} id="icon-button-file" type="file"/>
            <span>
              {this.state.photos ? this.state.photos.name : ''}
            </span>

            { this.state.error && (<h5 component="p" color="error">
                  {this.state.error}
                </h5>)
            }
          </CardBody>
          <CardFooter>
              <div className='float-right'>
                  <Button size="sm" disabled={this.state.text === ''} onClick={this.clickPost}>Post</Button>
                  <Button size="sm" onClick={this.toggle}>Cancel</Button>
              </div>
          </CardFooter>
        </Card>
      </Collapse>
  </div>)
  }
}

NewPost.propTypes = {
  addUpdate: PropTypes.func.isRequired
}

export default NewPost;


