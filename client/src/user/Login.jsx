import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Badge, Button, Card, CardBody, Container, Row, Col } from "mdbreact";
import { signin } from '../auth/api-auth.js'
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
    let errorMessage = this.state.error

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
               <Card>
                <CardBody>
                <form>
                  <h3 style={styles.heading} className="text-center mb-4">Log In</h3>
                  {
                    this.state.error && (<h4 className="text-center">
                    <Badge tag="a" href="#!" color="danger">{errorMessage}</Badge></h4>)
                  }
                  <label htmlFor="defaultFormLoginEmailEx" className="grey-text">Email</label>
                  <input type="text" name="email" id="defaultFormLoginEmailEx" className="form-control" value={this.state.email}
                    onChange={this.handleChange('email')}/>
                  <br />
                  <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">Password</label>
                  <input type="password" name="password" value={this.state.password} onChange={this.handleChange('password')} id="defaultFormLoginPasswordEx" className="form-control"/>
                  <p className="font-small grey-text d-flex justify-content-end">Forgot <a href="/" className="dark-grey-text font-weight-bold ml-1"> Password?</a></p>
                  <br/> 
                  <div className="text-center">
                    <Button onClick={this.handleSubmit}>Login</Button>
                  </div>
                  <br />
                  <p className="font-small grey-text d-flex justify-content-center">Don't have an account?</p>
                  <div className="text-center">
                    <p><a href="/register/student" className="grey-text font-small ml-1"> Register as a student.</a><a href="/register/teacher" className="grey-text font-small ml-1"> Register as a teacher.</a></p>
                  </div>
                </form>
              </CardBody>
            </Card>
            </Col>
            <Col></Col>
          </Row>
          <Row>
						<Col>
								<div className="text-center mt-5">
									<Button color="amber" size="md" href="/">Back Home</Button>
								</div>
						</Col>
					</Row>
        </Container>
      );
    }
  }

export default LoginPage;


