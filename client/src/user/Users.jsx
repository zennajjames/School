import React, {Component} from 'react'
import { Container, Card, CardBody, Badge } from 'mdbreact';

import {listUsers} from './api-user.js'
import FindPeople from './profile/FindPeople';

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
    listUsers().then((data) => {
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
          <FindPeople/>
          <h4>Students</h4>
          <hr />
          <div className="d-flex flex-row">
          {this.state.users.map((item, i) => {
               return <div className="p-2 text-center m-2" key={i}>
                        <img style={styles.avatar} className="z-depth-1-half mb-2" src={'/api/users/photo/'+item._id} alt="Users"/>
                        <h5><Badge color="cyan">{item.name}</Badge></h5>
                        <h6><Badge color="info">Follow</Badge></h6>
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
