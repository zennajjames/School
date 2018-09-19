import React, {Component} from 'react'
import { Button, Badge, Card, Fa } from 'mdbreact';
import {findPeople, follow} from '../api-user.js'
import auth from '../../auth/auth-helper.js'

const styles = {
  badge: {
    width: 250,
    height:90
  },
  nameLink: {
    color: "black",
    fontSize: 16
  },
  heading: {
    fontWeight: 400,
    color: "white",
    paddingTop: 10
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
    console.log(user)
    follow({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, user._id).then((data) => {
      console.log(data)
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
       
         {this.state.users.length > 0
        ? ( <div className="d-flex flex-row flex-wrap justify-content-center">
          {this.state.users.map((person, i) => {
               return <div className="p-2 text-center m-2" key={i}>
                        <img style={{maxWidth: "80px", WebkitFilter: 'drop-shadow(1px 1px 1px #8a8a8a)', filter: 'drop-shadow(1px 1px 1px #4d4d4d)', paddingBottom: 5, borderRadius: "50%"}} src={'/api/users/photo/'+person._id} alt="Classmates"/>
                        <div className="d-flex d-inline">
                            {person.role === "Teacher"
                          ?(<h6 className="p-1"><Badge className="d-inline" color="amber darken-2" pill><Fa icon="star-o" aria-hidden="true"/></Badge></h6>)
                          : (<div></div>)
                          }
                        <h5><Badge color="cyan">{person.name}</Badge></h5>
                        </div>
                        <h6><Badge onClick={this.clickFollow.bind(this, person, i)} color="info">Follow</Badge></h6>
                      </div>
                  })}  
          </div> 
          )
        : (<div className="text-center mb-4">
              <h3 className="m-2 p-2"><Badge>Awesome! You are connected with of the students in your classes!</Badge></h3>
              <Button href="/" color="amber darken-2">Return To Dashboard</Button>
          </div>)
        }
    </div>
      )
  }
}


export default FindPeople;

