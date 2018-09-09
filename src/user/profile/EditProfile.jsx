import React, {Component} from 'react'
import { Container, Button, Card, CardTitle, Fa, CardBody, CardImage, Input } from 'mdbreact';

import auth from '../../auth/auth-helper'
import {read, update} from '../api-user'
import {Redirect} from 'react-router-dom'

const styles = {
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    width: 300
  },
  submit: {
    margin: 'auto',
  },
  bigAvatar: {
    width: 75,
    height: 75,
    margin: 'auto',
    borderRadius:50
  },
  input: {
    fontSize: 10
  },
  span: {
    fontSize: 10
  },
  filename:{
    marginLeft:'10px'
  }
}

class EditProfile extends Component {
  constructor({match}) {
    super()
    this.state = {
      name: '',
      about: '',
      photo: '',
      email: '',
      password: '',
      redirectToProfile: false,
      error: ''
    }
    this.match = match
  }

  componentDidMount = () => {
    console.log(this.props)
    this.userData = new FormData()
    const jwt = auth.isAuthenticated()
    read({
      userId: this.props.match.params.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({id: data._id, name: data.name, email: data.email, about: data.about})
      }
    })
  }
  
  clickSubmit = () => {
    const jwt = auth.isAuthenticated()
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined,
      about: this.state.about || undefined
    }
    update({
      userId: this.match.params.userId
    }, {
      t: jwt.token
    }, this.userData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({'redirectToProfile': true})
      }
    })
  }

  handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    this.userData.set(name, value)
    this.setState({ [name]: value })
  }

  render() {
    const photoUrl = this.state.id
                 ? `/api/users/photo/${this.state.id}?${new Date().getTime()}`
                 : '/api/users/defaultphoto'
    if (this.state.redirectToProfile) {
      return (<Redirect to={'/user/' + this.state.id}/>)
    }
    return (
      <Container>
      <Card>
        <CardBody>
          <CardTitle>Edit Profile</CardTitle>
          <hr/>
          <img alt="profilePic" src={photoUrl} style={styles.bigAvatar}/><br/>
          <input style={styles.input} accept="image/*" onChange={this.handleChange('photo')} id="icon-button-file" type="file" />
          <br/>
          
          <Input size="sm" id="name" label="Name" value={this.state.name} onChange={this.handleChange('name')} margin="normal"/>
          <Input size="sm" id="email" label="Email"  value={this.state.email} onChange={this.handleChange('email')} margin="normal"/>
          <Input size="sm" id="password" label="Password" value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
          <Input type="textarea" label="About" icon="pencil" value={this.state.about} onChange={this.handleChange('about')} margin="normal"/>
          <br/>
           {
            this.state.error && (<h5 component="p" color="error">
              <Fa icon="exclamation-circle">error</Fa>
              {this.state.error}
            </h5>)
          }
          <Button color="primary" onClick={this.clickSubmit}>Submit</Button>
        </CardBody>
      </Card>
    </Container>
    )
  }
}

export default EditProfile
