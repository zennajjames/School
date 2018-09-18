import React, { Component } from "react";
import { Button, Badge } from "mdbreact";
import {enroll, addToRoster} from '../user/api-user'
import auth from '../auth/auth-helper.js'

import history from '../history';

class Enroll extends Component {
  state = {
    courseCode: '',
    success: '',
    error: '',
    id: '',
    courses: [],
  };

  componentDidMount = () => {
    console.log(this.props)
    console.log(history)
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  signUpForCourse = () => {
    console.log(this.state.courseCode)
    const jwt = auth.isAuthenticated()
    enroll({userId: jwt.user._id}, {t: jwt.token}, 
      {userId:this.props.userId, courseCode:this.state.courseCode}).then((data) => {
      if (!data) {
        this.setState({error: 'Course not found.'})
      } else {
        this.setState({courseCode: ''})
      }
    })
    this.addStudentToRoster()
  }


  addStudentToRoster = () => {
    console.log(this.state.courseCode)
    const jwt = auth.isAuthenticated()
    addToRoster({ userId: jwt.user._id}, {t: jwt.token}, 
      {userId:this.props.userId, courseCode:this.state.courseCode}).then((data) => {
      if (!data) {
        this.setState({error:"Error adding student to roster."})
      } else {
        this.setState({courseCode: ''})
        window.location.reload()
      }
    })
  }


  render() {
    let errorMessage = this.state.error
      return (
          <form>
            <label htmlFor="courseCode" className="grey-text">Course Code</label>
            {
                    this.state.error && (<h4 className="text-center">
                    <Badge tag="a" href="#!" color="danger">{errorMessage}</Badge></h4>)
                  }
            <input type="text" name="courseCode" className="form-control" value={this.state.courseCode}
              onChange={this.handleChange('courseCode')}/>
            <p className="font-small grey-text d-flex justify-content-end">Forgot <a href="/" className="dark-grey-text font-weight-bold ml-1"> Course Code?</a></p>
            <div className="text-center">
              <Button onClick={this.signUpForCourse}>Enroll</Button>
            </div>
            <br />
          </form>      
      );
    }
  }

export default Enroll;


