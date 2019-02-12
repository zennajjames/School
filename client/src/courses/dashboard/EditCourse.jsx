import React, {Component} from 'react'
import { Row, Col, Container, Button, Card, CardTitle, Fa, CardBody, Input, Badge, InputFile } from 'mdbreact';
import Modal from '../../core/Modal'
import auth from '../../auth/auth-helper'
import {listOne, update, remove, upload} from '../api-course'
import {Redirect} from 'react-router-dom'

import "isomorphic-fetch";
import "es6-promise/auto";
// import S3Uploader from '../../core/S3Uploader'

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
      error: '',
      file: null
    }
    this.match = match
  }

  componentDidMount = () => {
    console.log(this.props)
    this.courseData = new FormData()
    this.loadCourseInfo()
  }
    
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
  
  clickSave = () => {
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

  handleSelectedFile = e => {
    this.setState({
      file: e.target.files
    });
  }


  submitFile = (e) => {
    e.preventDefault();
      const file = this.state.file[0];
      console.log(file);
      const data = new FormData();
            data.append("file", file);
            console.log(data);
            upload(data)
            .then(response => console.log("File uploaded!"));
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
        <Row>
           <Col className="col-12 col-lg-8 col-sm-10">
            <Card className="mt-2 p-2">
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
                <Input id="title" label="Title" value={this.state.title} onChange={this.handleChange('title')} margin="normal"/>
                <Input id="tagline" label="Tagline"  value={this.state.tagline} onChange={this.handleChange('tagline')} margin="normal"/>
                <Input hint="Add a course description." id="description" value={this.state.description} onChange={this.handleChange('description')} margin="normal"/>
                
                <br/>
                <div className="d-flex d-inline float-right">
                  <Button size="sm" color="cyan" onClick={this.clickSave}>Save</Button>
                  <Button size="sm" color="cyan" href={'/users/' + this.state.id}>Cancel</Button>
                  <Modal className="float-right" header={"Confirm to delete your course."} closeButton={"Cancel"} openButton={<div><Fa icon="trash" aria-label="Delete"/></div>} body={<Button className="mx-auto" onClick={this.deleteCourse} color="danger" autoFocus="autoFocus">Confirm.</Button>}></Modal>
                </div>         
              </CardBody>
            </Card>
          </Col>
          <Col className="col-12 col-lg-4 col-sm-10">
            <Card className="mt-2">
              <CardBody>
                <CardTitle>Add Video</CardTitle>
                <hr/>
                <input className="m-2 form-control form-control-sm" type="text" placeholder="Lesson Number"/>
                <input className="m-2 form-control form-control-sm" type="text" placeholder="Video Title"/>
                <input className="m-2 form-control form-control-sm" type="text" placeholder="Video ID"/>
                <Button className="float-right" size="sm" color="cyan" onClick={this.submitFile}>Save</Button>
              </CardBody>
            </Card>
            <Card className="mt-3">
              <CardBody>
                <CardTitle>Add Files</CardTitle>
                <hr/>
                <form>
                  <input label='upload file' type='file' onChange={this.handleSelectedFile} ></input>
                  <Button type='submit' className="float-right" size="sm" color="cyan" onClick={this.submitFile}>Save</Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
    </Container>
    )
  }
}

export default EditCourse

