import React, {Component} from 'react'
import { Container, Card, CardBody, Badge } from 'mdbreact';
import auth from '../auth/auth-helper.js'
import {listUsers} from './api-user.js'


class Users extends Component {
  state = {
      users: [],
      error: ''
  }

  componentDidMount() {
    const jwt = auth.isAuthenticated()
    let userId = jwt.user._id
    listUsers().then((users) => {
      console.log(users)
      if (!users) {
        console.log("No users!")
      } else {
        let students = []
        for (let i = 0; i < users.length; i++) {
          if (users[i]._id !== userId) {
            students.push(users[i])
          }
        }
        this.setState({users: students})
      }
      console.log(this.state.users)
    })
  }

  render() {
    console.log(this.state)
    console.log(this.props)
    return (
      <Container>
      <Card>
        <CardBody>
          <h4>Students</h4>
          <hr />
          <div className="d-flex flex-row">
          {this.state.users.map((person, i) => {
               return <div className="p-2 text-center m-2" key={i}>
                        <img style={{maxWidth: "80px", WebkitFilter: 'drop-shadow(1px 1px 1px #8a8a8a)', filter: 'drop-shadow(1px 1px 1px #4d4d4d)', paddingBottom: 5, borderRadius: "50%"}} src={'/api/users/photo/'+person._id} src={'/api/users/photo/'+person._id} alt="Users"/>
                        <h5><Badge tag="a" href={"/users/" + person._id} color="cyan">{person.name}</Badge></h5>
                      </div>
                  })}  
          </div> 
        </CardBody>
      </Card>
    </Container>
    )
  }
}

export default Users;
