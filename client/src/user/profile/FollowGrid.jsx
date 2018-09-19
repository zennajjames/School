import React, {Component} from 'react'
import { Container, Badge } from 'mdbreact';

class FollowGrid extends Component {
  render() {
    console.log(this.props.people)
    return (<Container className="d-flex flex-wrap">
            {this.props.people.map((person, i) => {
            return <div className="p-2 text-center m-2" key={i}>
                  <img style={{maxWidth: "80px", WebkitFilter: 'drop-shadow(1px 1px 1px #8a8a8a)', filter: 'drop-shadow(1px 1px 1px #4d4d4d)', paddingBottom: 5, borderRadius: "50%"}} src={'/api/users/photo/'+person._id} alt="Users"/>
                  <h5><Badge tag="a" href={"/users/" + person._id} color="cyan">{person.name}</Badge></h5>
                </div>
                })}
            </Container>)
  }
}

export default FollowGrid;
