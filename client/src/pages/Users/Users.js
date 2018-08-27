import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import axios from "axios";

// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";

class UserSignUp extends Component {
  state = {
    username: "",
    password: "",
    errors: {},
  };

  deleteUser = id => {
    API.deleteUser(id)
      .then(res => this.loadUsers())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      axios.post("/api/users", {
        username: this.state.username,
        password: this.state.password,
      })
        .then(response => {
          console.log(response)
          if (!response.data.errmsg) {
            console.log('Successful signup!')
            this.setState({ //redirect to login page
              redirectTo: '/login'
            })
          } else {
            console.log('Username already taken.')
          }
        }).catch(error => {
          console.log('signup error: ')
          console.log(error)
        })
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Sign up!</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.username}
                onChange={this.handleInputChange}
                name="username"
                placeholder="Username (required)"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                type="password"
                placeholder="Password (required)"
              />
              <FormBtn
                disabled={!(this.state.username&& this.state.password)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserSignUp;
