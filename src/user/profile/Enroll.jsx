import React, { Component } from "react";
import { Button, Card, CardBody, Container, Row, Col } from "mdbreact";
import {enroll} from '../api-user'
import auth from '../../auth/auth-helper.js'


const styles = {
  heading: {
    fontWeight: 300
  }
}
class Enroll extends Component {
  state = {
    courseCode: '',
    success: '',
    error: '',
    id: '',
    courses: [],
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  addCourse = (event) => {
    event.preventDefault()
    console.log(this.state.courseCode)
    const jwt = auth.isAuthenticated()
    enroll({ userId: jwt.user._id}, {t: jwt.token}, 
      this.props.userId, {courseCode:this.state.courseCode}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({courseCode: ''})
      }
    })
  }


// deleteComment = comment => event => {
//   const jwt = auth.isAuthenticated()
//   uncomment({
//     userId: jwt.user._id
//   }, {
//     t: jwt.token
//   }, this.props.postId, comment).then((data) => {
//     if (data.error) {
//       console.log(data.error)
//     } else {
//       this.props.updateComments(data.comments)
//     }
//   })
// }

  render() {
      return (
        <Container>
          <Row>
            <Col></Col>
             <Col className="col-8">
               <Card>
                <CardBody>
                <form>
                  <h3 style={styles.heading} className="text-center mb-4">Add A Course</h3>
                  <label htmlFor="courseCode" className="grey-text">Course Code</label>
                  <input type="text" name="courseCode" className="form-control" value={this.state.courseCode}
                    onChange={this.handleChange('courseCode')}/>
                  <p className="font-small grey-text d-flex justify-content-end">Forgot <a href="/" className="dark-grey-text font-weight-bold ml-1"> Course Code?</a></p>
                  <div className="text-center">
                    <Button onClick={this.addCourse}>Enroll</Button>
                  </div>
                  <br />
                </form>
              </CardBody>
            </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      );
    }
  }

export default Enroll;


