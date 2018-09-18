import React, {Component} from 'react'
import { Badge, Chip, ListGroup } from 'mdbreact';


// import {Link} from 'react-router-dom'
import {findPeople, follow} from '../api-user.js'
import auth from '../../auth/auth-helper.js'


const styles = {
  avatar: {
    width: 75,
    height: 75,
    margin: 5,
    borderRadius: 50
  },
  // heading: {
  //   color: "white"
  // },
  badge: {
    width: 250,
    height:90
  },
  nameLink: {
    color: "black",
    fontSize: 16
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
      <h4 style={styles.heading}>Classmates</h4>
        <hr />
        <div className="d-flex flex-row">
          {this.state.users.map((item, i) => {
               return <div className="p-2 text-center m-2" key={i}>
                        <img style={styles.avatar} className="z-depth-1-half mb-2" src={'/api/users/photo/'+item._id} alt="Classmates"/>
                        <h5><Badge color="cyan">{item.name}</Badge></h5>
                        <h6><Badge onClick={this.clickFollow.bind(this, item, i)} color="info">Follow</Badge></h6>
                      </div>
                  })}  
          </div> 
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

 