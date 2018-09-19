import React, {Component} from 'react'
import { Badge, Fa } from 'mdbreact';
import "./badgeOverlay.css";

class FollowGrid extends Component {
  render() {
    console.log(this.props.people)
    return (
          <div>
            <div className="d-flex flex-wrap flex-row justify-content-center">
            {this.props.people.map((person, i) => {
            return <div className="m-2 p-2 text-center" key={i}>
                    <div className="profile-photo">
                    <img style={{maxWidth: "70px", WebkitFilter: 'drop-shadow(1px 1px 1px #8a8a8a)', filter: 'drop-shadow(1px 1px 1px #4d4d4d)', paddingBottom: 5, borderRadius: "50%"}} src={'/api/users/photo/'+person._id} alt="Users"/>                          
                    {person.role === "Teacher"
                          ?(<h6 className="p-1 teacher-badge"><Badge className="d-inline" color="amber darken-2" pill><Fa icon="star-o" aria-hidden="true"/></Badge></h6>)
                          : (<div></div>)
                          }
                    </div>
                      <h5><Badge tag="a" href={"/users/" + person._id} color="cyan">{person.name}</Badge></h5>
                  </div>
                })}
          </div>
        </div>
       )
  }
}

export default FollowGrid;
