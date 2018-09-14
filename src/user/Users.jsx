import React, {Component} from 'react'
import { Container, Card, CardBody, Button, Badge } from 'mdbreact';

import {Link} from 'react-router-dom'
import {list} from './api-user.js'

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
      users: []
  }

  componentDidMount() {
    list().then((data) => {
      console.log(data)
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({users: data})
      }
      console.log(this.state.users)
    })
  }

  render() {
    return (
      <Container>
      <Card>
        <CardBody>
          <h4>Students</h4>
          <hr />
          {this.state.users.map((item, i) => {
               return <span className="d-flex flex-column" key={i}>
                    <div className="p-2">
                      <img style={styles.avatar} className="z-depth-1-half" src={'/api/users/photo/'+item._id} alt="Users"/>
                    </div>
                    <h6 className="p-2"><Badge color="cyan">{item.name}</Badge></h6>
                 </span>
              })
          }   
        </CardBody>
      </Card>
    </Container>
    )
  }
}

export default Users;
