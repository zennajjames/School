import React, {Component} from 'react'
import { Container, Button, Card, CardTitle, Fa, CardBody, Input, Badge } from 'mdbreact';
import Modal from '../../core/Modal'
import auth from '../../auth/auth-helper'
import {read, listOne, update, remove} from '../api-course'
import {Redirect} from 'react-router-dom'
import AWSUpload from '../../core/FileUpload'


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
class EditCourse extends Component {
  constructor({match}) {
    super()
    this.state = {
      course: [],
      role: '',
      userId: '',
      title: '',
      tagline: '',
      description: '',
      redirectToReferrer: false,
      redirectHome: false,
      id: '',
      error: ''
    }
    this.match = match
  }

  componentDidMount = () => {
    console.log(this.props)
    this.courseData = new FormData()
    this.loadCourseInfo()
  }
  //   read({
  //     courseId: this.props.match.params.courseId
  //   }).then((course) => {
  //     console.log(course)
  //     if (!course) {
  //       this.setState({error: "Error loading course data."})
  //     } else {
  //       this.setState({id: course._id, title: course.title, tagline: course.tagline, description: course.description})
  //     }
  //   })
  // }

    
  loadCourseInfo = () => {
      // const jwt = auth.isAuthenticated()
      listOne({
        courseId: this.props.match.params.courseId
      }).then((data) => {
        if (!data) {
          console.log("No response!")
        } else {
          this.setState({course: data})
          this.setState({id: data._id, title: data.title, tagline: data.tagline, description: data.description})
          this.setState({videos: data.videos})
          console.log(this.state.course)
        }
      })
  }
  
  clickSubmit = () => {
    const course = {
      title: this.state.title || undefined,
      tagline: this.state.tagline || undefined,
      description: this.state.description || undefined
    }
    console.log(course)
    update({ courseId: this.match.params.courseId}, 
      this.courseData).then((data) => {
      if (!data) {
        this.setState({error: "No data!"})
      } else {
        this.setState({redirectToReferrer: true})
      }
    })
  }

  handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    this.courseData.set(name, value)
    this.setState({ [name]: value })
  }


  deleteCourse = () => {
    const jwt = auth.isAuthenticated()
    remove({
      courseId: this.state.id
    }, {t: jwt.token}).then((course) => {
      if (!course) {
        console.log("Error deleting course.")
      } else {
        auth.signout(() => console.log('Course deleted.'))
        this.setState({redirectHome: true})
      }
    })
  }

  render() {
    const photoUrl = this.state.id
                 ? `/api/courses/photo/${this.state.id}?${new Date().getTime()}`
                 : '/api/courses/defaultphoto'
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/courses/' + this.state.id}/>)
    }
    if (this.state.redirectHome) {
      return (<Redirect to={'/'}/>)
    }
    return (
      <Container>
      <Card>
        <CardBody>
          <CardTitle>Edit Course</CardTitle>
          {
            this.state.error && 
            (<h5><Badge color="danger">{this.state.error}</Badge></h5>)
          }
          <hr/>
          <img alt="profilePic" src={photoUrl} style={styles.bigAvatar}/><br/>
          <input style={styles.input} accept="image/*" onChange={this.handleChange('photo')} id="icon-button-file" type="file" />  
          <br/>
          <Input size="sm" id="title" label="Title" value={this.state.title} onChange={this.handleChange('title')} margin="normal"/>
          <Input size="sm" id="tagline" label="Tagline"  value={this.state.tagline} onChange={this.handleChange('tagline')} margin="normal"/>
          <Input type="textarea" hint="Add a course description." id="description" value={this.state.description} onChange={this.handleChange('description')} margin="normal"/>
          <AWSUpload/>
          <br/>
          <Button size="sm" color="primary" onClick={this.clickSubmit}>Submit</Button>
          <Button size="sm" color="primary" href={'/users/' + this.state.id}>Cancel</Button>
          <Modal className="float-right" header={"Confirm to delete your course."} closeButton={"Cancel"} openButton={<div><Fa icon="trash" aria-label="Delete"/>Delete Course</div>} body={<Button className="mx-auto" onClick={this.deleteCourse} color="danger" autoFocus="autoFocus">Confirm.</Button>}></Modal>         
        </CardBody>
      </Card>
    </Container>
    )
  }
}

export default EditCourse


    
  // loadCourseInfo = () => {
  //     // const jwt = auth.isAuthenticated()
  //     listOne({
  //       courseId: this.props.match.params.courseId
  //     }).then((data) => {
  //       if (!data) {
  //         console.log("No response!")
  //       } else {
  //         this.setState({course: data})
  //         this.setState({videos: data.videos})
  //       }
  //     })
  //     console.log(this.state.course)
  // }