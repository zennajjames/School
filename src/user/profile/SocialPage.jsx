import React, { Component } from 'react';
import { Container, Row, Col } from 'mdbreact';

class SocialPage extends Component {
  render() {
    return(
      <Container style={{maxWidth: '80%'}}>
        <Row>
          <div className="mdb-feed">
            <div className="news">
              <div className="label">
                <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg" className="rounded-circle z-depth-1-half"/>
              </div>
              <div className="excerpt">
                <div className="brief">
                  <a className="name">John Doe</a> added you as a friend
                  <div className="date">1 hour ago</div>
                </div>
                <div className="feed-footer">
                  <a className="like">
                    <i className="fa fa-heart"></i>
                    <span>5 likes</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="news">
              <div className="label">
                <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(17)-mini.jpg" className="rounded-circle z-depth-1-half"/>
              </div>
              <div className="excerpt">
                <div className="brief">
                  <a className="name">Anna Smith</a> added <a>2 new illustrations</a>
                  <div className="date">4 hours ago</div>
                </div>
                <div className="added-images">
                  <img src="https://mdbootstrap.com/img/Photos/Others/images/71.jpg" className="z-depth-1 rounded mb-md-0 mb-2"/>
                  <img src="https://mdbootstrap.com/img/Photos/Others/images/74.jpg" className="z-depth-1 rounded"/>
                </div>
                <div className="feed-footer">
                  <a className="like">
                    <i className="fa fa-heart"></i>
                    <span>18 likes</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="news">
              <div className="label">
                <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9)-mini.jpg" className="rounded-circle z-depth-1-half"/>
              </div>
              <div className="excerpt">
                <div className="brief">
                  <a className="name">Danny Moore</a> added you as a friend
                  <div className="date">7 hours ago</div>
                </div>
                <div className="feed-footer">
                  <a className="like">
                    <i className="fa fa-heart"></i>
                    <span>11 likes</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="news">
              <div className="label">
                <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(18)-mini.jpg" className="rounded-circle z-depth-1-half"/>
              </div>
              <div className="excerpt">
                <div className="brief">
                  <a className="name">Lili Rose</a> posted on her page
                  <div className="date">2 days ago</div>
                </div>
                <div className="added-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero inventore, iste quas libero eius? Vitae sint neque animi alias sunt dolor, accusantium ducimus, non placeat voluptate.</div>
                <div className="feed-footer">
                  <a className="like">
                    <i className="fa fa-heart"></i>
                    <span>7 likes</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="news">
              <div className="label">
                <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20)-mini.jpg" className="rounded-circle z-depth-1-half"/>
              </div>
              <div className="excerpt">
                <div className="brief">
                  <a className="name">Kate Harrison</a> added <a> 2 new photos</a> of you
                  <div className="date">3 days ago</div>
                </div>
                <div className="added-images">
                  <img src="https://mdbootstrap.com/img/Photos/Others/images/29.jpg" className="z-depth-1 rounded mb-md-0 mb-2"/>
                  <img src="https://mdbootstrap.com/img/Photos/Others/images/31.jpg" className="z-depth-1 rounded"/>
                </div>
                <div className="feed-footer">
                  <a className="like">
                    <i className="fa fa-heart"></i>
                    <span>53 likes</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </Row>
      </Container>
    );
  }
}

export default SocialPage;