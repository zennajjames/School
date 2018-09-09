import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, Input, Container, Row, Col } from "mdbreact";
import {signin} from '../auth/api-auth.js'
import auth from '../auth/auth-helper.js'

const styles = {
  heading: {
    fontWeight: 300
  }
}

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  };

  handleSubmit = () => {
    const user = {
      email: this.state.email || undefined,
      password: this.state.password || undefined
    }

    signin(user).then((data) => {
      console.log(data)
      if (data.error) {
        this.setState({error: data.error})
      } else {
        auth.authenticate(data, () => {
          console.log("Successful sign in!")
          this.setState({redirectToReferrer: true})
        })
      }
    })
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  }

  render() {
    console.log(this.props)
    const {from} = this.props.location.state || {
      from: {
        pathname: '/'
      }
    }
    const {redirectToReferrer} = this.state
    if (redirectToReferrer) {
      return (<Redirect to={from}/>)
    }
      return (
        
        <Container>
          <Row>
            <Col></Col>
             <Col className="col-8">
               <Card color="amber lighten-4">
                <CardBody>
                <form>
                  <h2 style={styles.heading}>Log In</h2>
                  <hr />
                  <label htmlFor="email">Email: </label>
                  <Input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                  /><br />
                  <label htmlFor="password">Password: </label>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                  />
                  <p className="font-small grey-text d-flex justify-content-end">Forgot <a href="#" className="dark-grey-text font-weight-bold ml-1"> Password?</a></p>
                  <br />
                  <div className="text-center">
                    <Button onClick={this.handleSubmit}>Login</Button>
                  </div>
                  <br/>
                  <p className="font-small grey-text d-flex justify-content-center">Don't have an account? <a href="/register" className="dark-grey-text font-weight-bold ml-1"> Register</a></p>
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

export default LoginPage;
