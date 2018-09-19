import React, {Component} from 'react'
import { Card, Badge, Fa, Button } from 'mdbreact';

const styles = {
  heading: {
    fontWeight: 400,
    color: "white",
    paddingTop: 10
  }
}
class FollowGrid extends Component {
  render() {
    console.log(this.props.people)
    return (
          <div>
            <div className="d-flex flex-wrap flex-row justify-content-center">
            {this.props.people.map((person, i) => {
            return <div className="m-2 p-2 text-center" key={i}>
                      <img style={{maxWidth: "70px", WebkitFilter: 'drop-shadow(1px 1px 1px #8a8a8a)', filter: 'drop-shadow(1px 1px 1px #4d4d4d)', paddingBottom: 5, borderRadius: "50%"}} src={'/api/users/photo/'+person._id} alt="Users"/>
                      <div className="d-flex d-inline">
                            {person.role === "Teacher"
                          ?(<h6 className="p-1"><Badge className="d-inline" color="amber darken-2" pill><Fa icon="star-o" aria-hidden="true"/></Badge></h6>)
                          : (<div></div>)
                          }
                        <h5><Badge tag="a" href={"/users/" + person._id} color="cyan">{person.name}</Badge></h5>
                      </div>
                  </div>
                })}
          </div>
          <div className="text-center">
              <Button color="amber darken-2 m-2" size="md" href="/students">Find More Connections</Button>
          </div>
        </div>
       )
  }
}

export default FollowGrid;
