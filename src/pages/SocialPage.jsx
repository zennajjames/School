import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Mask, Fa, View, Tooltip, Collapse, Input, CardImage, CardTitle, CardText, Button} from 'mdbreact';

class SocialPage extends Component {

    state = {
      comment1: false,
      comment2: false,
      comment3: false,
      comment4: false,
      comment5: false
    }

  click1 = () => {
    this.setState({
      comment1: !this.state.comment1
    })
  }
  click2 = () => {
    this.setState({
      comment2: !this.state.comment2
    })
  }
  click3 = () => {
    this.setState({
      comment3: !this.state.comment3
    })
  }
  click4 = () => {
    this.setState({
      comment4: !this.state.comment4
    })
  }
  click5 = () => {
    this.setState({
      comment5: !this.state.comment5
    })
  }
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
                  <div className="d-flex">
                    <a className="comment" aria-expanded="false" aria-controls="collapseExample-1" onClick={this.click1}>Comment </a> &middot; <span><a> 7 </a></span>
                    <a className="thumbs">
                      <Tooltip tag="span" placement="top" tooltipContent="I like it">
                        <Fa icon="thumbs-up"/>
                      </Tooltip>
                    </a>
                    <a className="thumbs">
                      <Tooltip placement="top" tooltipContent="I don't like it">
                        <Fa icon="thumbs-down"/>
                      </Tooltip>
                    </a>
                  </div>
                  <Collapse id="collapseExample-1" isOpen={this.state.comment1}>
                    <Card className="card-body mt-1">
                      <Input type="textarea" label="Add comment"/>
                      <div className="d-flex justify-content-end">
                        <Button flat onClick={this.click1}>Cancel</Button>
                        <Button color="primary" onClick={this.click1}>Reply</Button>
                      </div>
                    </Card>
                  </Collapse>
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
                  <img src="https://mdbootstrap.com/img/Photos/Others/images/50.jpg" className="z-depth-1 rounded mb-md-0 mb-2"/>
                  <img src="https://mdbootstrap.com/img/Photos/Others/images/52.jpg" className="z-depth-1 rounded"/>
                </div>
                <div className="feed-footer">
                  <div className="d-flex">
                    <a className="comment" aria-expanded="false" aria-controls="collapseExample-2" onClick={this.click2}>Comment </a> &middot; <span><a> 31 </a></span>
                    <a className="thumbs">
                      <Tooltip tag="span" placement="top" tooltipContent="I like it">
                        <Fa icon="thumbs-up"/>
                      </Tooltip>
                    </a>
                    <a className="thumbs">
                      <Tooltip placement="top" tooltipContent="I don't like it">
                        <Fa icon="thumbs-down"/>
                      </Tooltip>
                    </a>
                  </div>
                  <Collapse id="collapseExample-2" isOpen={this.state.comment2}>
                    <Card className="card-body mt-1">
                      <Input type="textarea" label="Add comment"/>
                      <div className="d-flex justify-content-end">
                        <Button flat onClick={this.click2}>Cancel</Button>
                        <Button color="primary" onClick={this.click2}>Reply</Button>
                      </div>
                    </Card>
                  </Collapse>
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
                  <div className="d-flex">
                    <a className="comment" aria-expanded="false" aria-controls="collapseExample-3" onClick={this.click3}>Comment </a> &middot; <span><a> 12 </a></span>
                    <a className="thumbs">
                      <Tooltip tag="span" placement="top" tooltipContent="I like it">
                        <Fa icon="thumbs-up"/>
                      </Tooltip>
                    </a>
                    <a className="thumbs">
                      <Tooltip placement="top" tooltipContent="I don't like it">
                        <Fa icon="thumbs-down"/>
                      </Tooltip>
                    </a>
                  </div>
                  <Collapse id="collapseExample-3" isOpen={this.state.comment3}>
                    <Card className="card-body mt-1">
                      <Input type="textarea" label="Add comment"/>
                      <div className="d-flex justify-content-end">
                        <Button flat onClick={this.click3}>Cancel</Button>
                        <Button color="primary" onClick={this.click3}>Reply</Button>
                      </div>
                    </Card>
                  </Collapse>
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
                  <div className="d-flex">
                    <a className="comment" aria-expanded="false" aria-controls="collapseExample-4" onClick={this.click4}>Comment </a> &middot; <span><a> 25 </a></span>
                    <a className="thumbs">
                      <Tooltip tag="span" placement="top" tooltipContent="I like it">
                        <Fa icon="thumbs-up"/>
                      </Tooltip>
                    </a>
                    <a className="thumbs">
                      <Tooltip placement="top" tooltipContent="I don't like it">
                        <Fa icon="thumbs-down"/>
                      </Tooltip>
                    </a>
                  </div>
                  <Collapse id="collapseExample-4" isOpen={this.state.comment4}>
                    <Card className="card-body mt-1">
                      <Input type="textarea" label="Add comment"/>
                      <div className="d-flex justify-content-end">
                        <Button flat onClick={this.click4}>Cancel</Button>
                        <Button color="primary" onClick={this.click4}>Reply</Button>
                      </div>
                    </Card>
                  </Collapse>
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
                  <img src="https://mdbootstrap.com/img/Photos/Others/images/81.jpg" className="z-depth-1 rounded mb-md-0 mb-2"/>
                  <img src="https://mdbootstrap.com/img/Photos/Others/images/86.jpg" className="z-depth-1 rounded"/>
                </div>
                <div className="feed-footer">
                  <div className="d-flex">
                    <a className="comment" aria-expanded="false" aria-controls="collapseExample-5" onClick={this.click5}>Comment </a> &middot; <span><a> 47 </a></span>
                    <a className="thumbs">
                      <Tooltip tag="span" placement="top" tooltipContent="I like it">
                        <Fa icon="thumbs-up"/>
                      </Tooltip>
                    </a>
                    <a className="thumbs">
                      <Tooltip placement="top" tooltipContent="I don't like it">
                        <Fa icon="thumbs-down"/>
                      </Tooltip>
                    </a>
                  </div>
                  <Collapse id="collapseExample-5" isOpen={this.state.comment5}>
                    <Card className="card-body mt-1">
                      <Input type="textarea" label="Add comment"/>
                      <div className="d-flex justify-content-end">
                        <Button flat onClick={this.click5}>Cancel</Button>
                        <Button color="primary" onClick={this.click5}>Reply</Button>
                      </div>
                    </Card>
                  </Collapse>
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