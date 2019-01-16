import React, { Component } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Fa,
  Table,
  TableBody
} from "mdbreact";
import auth from "../auth/auth-helper";
import Newsfeed from "../post/Newsfeed.jsx";
import CourseGrid from "../courses/CourseGrid";
import FollowGrid from "../user/profile/FollowGrid";
import { read } from "../user/api-user";

import Enroll from "../courses/Enroll";
import Modal from "./Modal";
import CreateCourse from "../courses/CreateCourse";

const styles = {
  heading: {
    fontWeight: 400,
    color: "black",
    paddingTop: "1rem",
    paddingLeft: "1rem",
    fontFamily: "benton-sans"
  }
};
class Home extends Component {
  state = {
    defaultPage: true,
    userFollowing: [],
    role: "",
    userId: ""
  };

  init = () => {
    if (auth.isAuthenticated()) {
      this.setState({ defaultPage: false });
      this.loadFollowing();
    } else {
      this.setState({ defaultPage: true });
    }
  };

  componentWillReceiveProps = () => {
    this.init();
  };

  componentDidMount = () => {
    this.init();
  };

  loadFollowing = () => {
    const jwt = auth.isAuthenticated();
    console.log(jwt.user);
    read(
      {
        userId: jwt.user._id
      },
      { t: jwt.token }
    ).then(data => {
      console.log(data);
      this.setState({ userFollowing: data.following });
      this.setState({ role: data.role });
      this.setState({ userId: data._id });
    });
  };

  render() {
    return (
      <Container>
        {this.state.defaultPage && (
          <section className="align-middle text-center my-3">
            <div className="align-middle text-center mt-3">
              <img
                className="w-responsive mx-auto"
                style={{
                  minWidth: "180px",
                  maxWidth: "25%",
                  WebkitFilter: "drop-shadow(1px 1px 1px #8a8a8a)",
                  filter: "drop-shadow(1px 1px 1px #4d4d4d)",
                  paddingBottom: 5
                }}
                src="/assets/images/school.png"
                alt="logo"
              />
              <br />
              <img
                className="w-responsive mx-auto"
                style={{
                  minWidth: "130px",
                  maxWidth: "20%",
                  WebkitFilter: "drop-shadow(1px 1px 1px #8a8a8a)",
                  filter: "drop-shadow(1px 1px 1px #4d4d4d)"
                }}
                src="/assets/images/schoolFish.png"
                alt="logo"
              />
              <br />
              <h4 className="white-text w-responsive mx-auto mt-5">
                An online learning community for creatives.
              </h4>
              <h4
                className="white-text w-responsive mx-auto mt-5"
                style={{ fontWeight: "500" }}
              >
                Take A Tour.
              </h4>

              <Table small className="white-text mx-auto mt-3" style={{maxWidth: "350px"}}>
                <TableBody>
                  <tr>
                    <td>Email: teach@school.io</td>
                    <td>Password: school-demo</td>
                  </tr>
                </TableBody>
              </Table>
              <br />
              <Row>
                <Col />
                <Col md="4" className="mb-2">
                  <Button
                    href="/register/student"
                    color="teal darken-1"
                    rounded
                    size="lg"
                  >
                    <Fa icon="clone" className="left" /> Students
                  </Button>
                </Col>
                <Col md="4" className="mb-2">
                  <Button
                    href="/register/teacher"
                    color="teal darken-1"
                    rounded
                    size="lg"
                  >
                    <Fa icon="clone" className="left" /> Teachers
                  </Button>
                </Col>
                <Col />
              </Row>
            </div>
          </section>
        )}
        {!this.state.defaultPage && (
          <div>
            <Row>
              <Col
                className="col-12 col-lg-8 col-sm-10"
                style={{ paddingBottom: "2rem" }}
              >
                <Card style={{ background: "rgba(255, 255, 255, 1)" }}>
                  <Newsfeed />
                </Card>
              </Col>
              <Col className="col-12 col-lg-4 col-sm-10">
                <Card style={{ background: "rgba(255, 255, 255, 1)" }}>
                  <div className="d-flex justify-content-between">
                    <h5 style={styles.heading} type="title">
                      My Courses
                    </h5>
                    <div>
                      {this.state.role === "Student" ? (
                        <Modal
                          header={"Add A Course"}
                          closeButton={"Cancel"}
                          openButton={"Add A Course"}
                          body={<Enroll userId={this.state.userId} />}
                        />
                      ) : (
                        <Modal
                          header={"Create A Course"}
                          closeButton={"Cancel"}
                          openButton={"Create A Course"}
                          body={<CreateCourse userId={this.state.userId} />}
                        />
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <hr align="center" style={{ width: "80%" }} />
                  </div>
                  <CourseGrid />
                </Card>
                <Card
                  style={{ background: "rgba(255, 255, 255, 1)" }}
                  className="mt-3"
                >
                  <h5 style={styles.heading} type="title">
                    Connections
                  </h5>
                  <div className="text-center">
                    <hr style={{ width: "80%", justifyContent: "center" }} />
                  </div>
                  <FollowGrid people={this.state.userFollowing} />
                  <div className="text-center">
                    <Button
                      color="amber lighten-1"
                      className="mb-3"
                      size="md"
                      href="/students"
                    >
                      Find Connections
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    );
  }
}

export default Home;
