import React, {Component} from 'react'

import { Container } from 'mdbreact';

const styles = {
  avatar: {
    width: 80,
    height: 80,
    margin: 'auto',
    borderRadius: 50
  },
  tileText: {
    textAlign: 'center',
    color: "black",
    fontSize: 16
  }
}

class FollowGrid extends Component {
  render() {
    console.log(this.props.people)
    return (<Container className="d-flex flex-wrap">
            {this.props.people.map((person, i) => {
            return <div key={i} className="p-2">
                      <div className="d-flex flex-column" style={{'height':120}} key={i}>
                        <img className="p-2" style={styles.avatar} alt="avatarPic" src={'/api/users/photo/'+person._id}/>
                        <a styles={styles.tileText} className="p-2" href={"/user/" + person._id}>
                          <p className="p-2" styles={styles.tileText}>{person.name}</p>
                        </a>
                      </div>
                   </div>
                })}
            </Container>)
  }
}

export default FollowGrid;
