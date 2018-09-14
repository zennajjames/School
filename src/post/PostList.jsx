import React, {Component} from 'react'
import Post from './Post'
import PropTypes from 'prop-types'
import {Row, Col, Button} from 'mdbreact'


class PostList extends Component {
  render() {
    let posts = this.props.posts
    console.log(posts)

    if (posts.length === 0)
      return (
        <Row>
          <Col style={{paddingBottom:20}} className="text-center">
            <h5 style={{paddingTop:20, paddingBottom:10}}>No posts yet! Connect with classmates or share something.</h5>
            <Button href="/users">Classmates</Button>
          </Col>
        </Row>
      )
      return (
        <div style={{marginTop: '24px'}}>
          {this.props.posts.map((item, i) => {
              return <Post post={item} key={i} onRemove={this.props.removeUpdate}/>
            })
          }
        </div>
      )
  }
}
PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
}
export default PostList
