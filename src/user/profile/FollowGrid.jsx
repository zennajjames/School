import React, {Component} from 'react'

import { Table, TableBody, TableHead, Button } from 'mdbreact';

import {Link} from 'react-router-dom'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: 'center',
    marginTop: 10
  }
}

class FollowGrid extends Component {
  render() {
    return (<div>
      <Table borderless>
        {this.props.people.map((person, i) => {
           return  <tr style={{'height':120}} key={i}>
              <Link to={"/user/" + person._id}>
                <img alt="avatar" src={'/api/users/photo/'+person._id} className={styles.bigAvatar}/>
                <h4 className={styles.tileText}>{person.name}</h4>
              </Link>
            </tr>
        })}
      </Table>
    </div>)
  }
}

export default FollowGrid;
