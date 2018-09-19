import React from 'react';
import { Container, Row, Badge, Col, TabPane, TabContent, Nav, NavItem, NavLink, Card, CardBody, Avatar, Mask, Fa, View, Button } from 'mdbreact';

const MyCourses = () =>  {
  return(
    <Container>
      <section>
        <h2 className="h1-responsive font-weight-bold my-5">Our amazing team</h2>
        <p className="grey-text w-responsive mx-auto mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur veniam.</p>
        <Row className="text-md-left">
          <Col lg="6" md="12" className="mb-5">
            <Col md="4" lg="6" className="float-left">
              <Avatar src="https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg" className="mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid" tag="img" alt="Sample avatar"/>
            </Col>
            <Col md="8" lg="6" className="float-right">
              <h4 className="font-weight-bold mb-3">John Doe</h4>
              <h6 className="font-weight-bold grey-text mb-3">Web Designer</h6>
              <p className="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur.</p>
              <a className="p-2 fa-lg fb-ic">
                <Fa icon="facebook"/>
              </a>
              <a className="p-2 fa-lg tw-ic">
                <Fa icon="twitter"/>
              </a>
              <a className="p-2 fa-lg dribbble-ic">
                <Fa icon="dribbble"/>
              </a>
            </Col>
          </Col>

          <Col lg="6" md="12" className="mb-5">
            <Col md="4" lg="6" className="float-left">
              <Avatar src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg" className="mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid" tag="img" alt="Sample avatar"/>
            </Col>
            <Col md="8" lg="6" className="float-right">
              <h4 className="font-weight-bold mb-3">Maria Kate</h4>
              <h6 className="font-weight-bold grey-text mb-3">Photographer</h6>
              <p className="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur.</p>
              <a className="p-2 fa-lg fb-ic">
                <Fa icon="facebook"/>
              </a>
              <a className="p-2 fa-lg yt-ic">
                <Fa icon="youtube"/>
              </a>
              <a className="p-2 fa-lg ins-ic">
                <Fa icon="instagram"/>
              </a>
            </Col>
          </Col>

          <Col lg="6" md="12" className="mb-5">
            <Col md="4" lg="6" className="float-left">
              <Avatar src="https://mdbootstrap.com/img/Photos/Avatars/img%20(26).jpg" className="mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid" tag="img" alt="Sample avatar"/>
            </Col>
            <Col md="8" lg="6" className="float-right">
              <h4 className="font-weight-bold mb-3">Anna Deynah</h4>
              <h6 className="font-weight-bold grey-text mb-3">Web Developer</h6>
              <p className="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur.</p>
              <a className="p-2 fa-lg fb-ic">
                <Fa icon="facebook"/>
              </a>
              <a className="p-2 fa-lg tw-ic">
                <Fa icon="twitter"/>
              </a>
              <a className="p-2 fa-lg github-ic">
                <Fa icon="github"/>
              </a>
            </Col>
          </Col>

          <Col lg="6" md="12" className="mb-5">
            <Col md="4" lg="6" className="float-left">
              <Avatar src="https://mdbootstrap.com/img/Photos/Avatars/img%20(29).jpg" className="mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid" tag="img" alt="Sample avatar"/>
            </Col>
            <Col md="8" lg="6" className="float-right">
              <h4 className="font-weight-bold mb-3">Sarah Melyah</h4>
              <h6 className="font-weight-bold grey-text mb-3">Front-end Developer</h6>
              <p className="grey-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur.</p>
              <a className="p-2 fa-lg gplus-ic">
                <Fa icon="google-plus"/>
              </a>
              <a className="p-2 fa-lg li-ic">
                <Fa icon="linkedin"/>
              </a>
              <a className="p-2 fa-lg email-ic">
                <Fa icon="envelope"/>
              </a>
            </Col>
          </Col>
        </Row>
      </section>
    </Container>
  );
}

export default MyCourses;