import React, {Component} from 'react'
import { Container, Button, Card, CardTitle, Fa, CardBody, Input } from 'mdbreact';
import Modal from '../../core/Modal'
import auth from '../../auth/auth-helper'
import {read, update, remove} from '../api-user'
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
      firstname: '',
      lastname: '',
      about: '',
      photo: '',
      email: '',
      role: '',
      password: '',
      redirectToProfile: false,
      redirectHome: false,
      id: '',
      error: ''
    }
    this.match = match
  }

  componentDidMount = () => {
    console.log(this.props)
    this.userData = new FormData()
    console.log(this.userData)
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
    const fullname = this.state.firstname + ' ' + this.state.lastname;
    const user = {
      firstname: this.state.firstname || undefined,
			lastname: this.state.lastname || undefined,
      name: fullname || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined,
      about: this.state.about || undefined,
      role: this.state.about || undefined
    }
    console.log(user)
    update({ userId: this.match.params.userId}, 
      { t: jwt.token}, 
      this.userData).then((data) => {
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


  deleteAccount = () => {
    const jwt = auth.isAuthenticated()
    remove({
      userId: this.state.id
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        auth.signout(() => console.log('Account Deleted.'))
        this.setState({redirectHome: true})
      }
    })
  }


  render() {
    console.log(this.props)
    const photoUrl = this.state.id
                 ? `/api/users/photo/${this.state.id}?${new Date().getTime()}`
                 : '/api/users/defaultphoto'
    if (this.state.redirectToProfile) {
      return (<Redirect to={'/users/' + this.state.id}/>)
    }
    if (this.state.redirectHome) {
      return (<Redirect to={'/'}/>)
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
          
          <Input size="sm" id="firstname" label="First Name" value={this.state.firstname} onChange={this.handleChange('firstname')} margin="normal"/>
          <Input size="sm" id="lastname" label="Last Name" value={this.state.lastname} onChange={this.handleChange('lastname')} margin="normal"/>
          <Input size="sm" id="email" label="Email"  value={this.state.email} onChange={this.handleChange('email')} margin="normal"/>
          <Input size="sm" id="password" label="Password" value={this.state.password} onChange={this.handleChange('password')} margin="normal"/>
          <Input size="sm" id="role" label="Role" value={this.state.role} onChange={this.handleChange('role')} margin="normal"/>
          <Input type="textarea" hint="Add a short bio..." label="About" icon="pencil" value={this.state.about} onChange={this.handleChange('about')} margin="normal"/>
          <br/>
           {
            this.state.error && (<h5 component="p" color="error">
              <Fa icon="exclamation-circle">error</Fa>
              {this.state.error}
            </h5>)
          }
          <div className="d-flex d-inline float-right">
            <Button size="sm" color="primary" onClick={this.clickSubmit}>Save</Button>
            <Button size="sm" color="primary" href={'/users/' + this.state.id}>Cancel</Button>
            <Modal className="float-right" header={"Confirm to delete your account."} closeButton={"Cancel"} openButton={<div><Fa icon="trash" aria-label="Delete"/>Delete Account</div>} body={<Button className="mx-auto" onClick={this.deleteAccount} color="danger" autoFocus="autoFocus">Confirm.</Button>}></Modal>         
          </div>
        </CardBody>
      </Card>
    </Container>
    )
  }
}

export default EditProfile
