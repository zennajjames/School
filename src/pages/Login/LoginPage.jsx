import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, Input } from "mdbreact";

// import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_disabled_web.png'
import googleButton from "./google_white.png";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    redirectTo: null
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("Logging user "+this.state.email+" in from login page...");
    this.props.login(this.state.email, this.state.password);
  //   if (this.props.responseCode === 200) {
  //     this.setState({
  //       redirectTo: "/dashboard"
  //     });
  //     } else {
  //       this.setState({
  //         redirectTo: "/dashboard"
  //       });
  //       console.log("Log in failed.");
  //     }
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="container">
          <Card>
            <CardBody>
              <form>
                <CardTitle>Log In</CardTitle>
                <label htmlFor="email">Email: </label>
                <Input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                /><br />
                <label htmlFor="password">Password: </label>
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                /><br />
                <Button onClick={this.handleSubmit}>Login</Button>
              </form>
              <a href="/auth/google">
                {/* <GoogleButton /> */}
                <img className="img" src={googleButton} alt="SignIn Google Button" />
              </a>
            </CardBody>
          </Card>
        </div>
      );
    }
  }
}

export default LoginPage;
