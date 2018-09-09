import React, {Component} from 'react'
import { Button, Badge, Fa, Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from 'mdbreact';


import {Link} from 'react-router-dom'
import {findPeople, follow} from './api-user.js'
import auth from '../auth/auth-helper.js'


const styles = {
  avatar: {
    width: 60,
    height: 60,
    margin: 10
  },
  heading: {
    fontWeight: 300
  }
}

class FindPeople extends Component {
  state = {
      users: [],
      open: false,
  }
  componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    findPeople({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({users: data})
      }
    })
  }

  clickFollow = (user, index) => {
    const jwt = auth.isAuthenticated()
    follow({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, user._id).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        let toFollow = this.state.users
        toFollow.splice(index, 1)
        this.setState({users: toFollow, open: true, followMessage: `Following ${user.name}!`})
      }
    })
  }

  handleRequestClose = (event, reason) => {
    this.setState({ open: false })
  }
  render() {
    // const {classes} = this.props
    return (
    <div>
      <Card>
        <CardBody>
        <CardTitle style={styles.heading}>Classmates</CardTitle>
        <hr />

        <ListGroup>
          {this.state.users.map((item, i) => { 
            return <span key={i}>
                  <ListGroupItem>
                      <img style={styles.avatar} alt="profilePic" src={'/api/users/photo/'+item._id}/>
                      <Link to={"/user/" + item._id}>
                        <CardText>{item.name}</CardText>
                        <Badge onClick={this.clickFollow.bind(this, item, i)} color="indigo">Follow</Badge>
                      </Link>
                  </ListGroupItem>
                </span>
          })
          }
        </ListGroup>
        </CardBody>
      </Card>
      <Badge
          open={this.state.open}
          onClose={this.handleRequestClose}
          message={<span>{this.state.followMessage}</span>}
      />
    </div>
      )
  }
}


export default FindPeople;

 