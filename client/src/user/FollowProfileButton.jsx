import React, {Component} from 'react'
import { Button } from 'mdbreact';
import {unfollow, follow} from './api-user.js'

class FollowProfileButton extends Component {

  followClick = () => {
    this.props.onButtonClick(follow)
  }

  unfollowClick = () => {
    this.props.onButtonClick(unfollow)
  }

  render() {
    return (<div>
      { this.props.following
        ? (<Button size="sm" color="secondary" onClick={this.unfollowClick}>Unfollow</Button>)
        : (<Button size="sm" color="primary" onClick={this.followClick}>Follow</Button>)
      }
    </div>)
  }
}

export default FollowProfileButton;
