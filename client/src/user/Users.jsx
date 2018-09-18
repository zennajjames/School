import React, {Component} from 'react'
import { Container, Card, CardBody, Badge } from 'mdbreact';
import auth from '../auth/auth-helper.js'
import {read, listUsers, follow} from './api-user.js'

import FollowProfileButton from './FollowProfileButton'

const styles = {
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50
  },
  userCard: {
    maxWidth:200
  }
}

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
                        <img style={styles.avatar} className="z-depth-1-half mb-2" src={'/api/users/photo/'+person._id} alt="Users"/>
                        <h5><Badge href={"/users/" + person._id} color="cyan">{person.name}</Badge></h5>
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
