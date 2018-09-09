import React, {Component} from 'react'
import { Container, Button, Card, CardTitle, CardBody, CardImage, ListGroup, ListGroupItem, Fa } from 'mdbreact';

import {Link} from 'react-router-dom'
import {list} from './api-user.js'

const styles = {
  avatar: {
    maxWidth: 60
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
          <CardTitle>All Users</CardTitle>
          <hr />
          {this.state.users.map((item, i) => {
            return <Link to={"/user/" + item._id} key={i}>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <img style={styles.avatar} src="/assets/images/avatars/avatar4.png" alt="profilePhoto"/>
                </li>
                <li className="list-inline-item">
                  <h5>{item.name}</h5>
                </li>
                <li className="list-inline-item">
                  <Button>
                    <Fa icon="arrow-right"/>
                  </Button>
                </li>
              </ul> 
            </Link> 
              })
          }   
        </CardBody>
      </Card>
      </Container>
    )
  }
}


export default Users;
