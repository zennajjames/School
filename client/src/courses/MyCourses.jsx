import React from 'react';
import { Row, Col, Card, Container} from 'mdbreact';
import CourseGrid from './CourseGrid';

const styles = {
  heading: {
    fontWeight: 300,
    padding: 10,
    margin: 20
  }
}

const MyCourses = () =>  {
  return(
    <Container>
      <Row>
        <Col>
          <Card className="m-2 p-2">
            <h2 style={styles.heading} type="title">My Courses</h2>
            <hr/>
            <CourseGrid/>
          </Card>
        </Col>
      </Row>    
    </Container>
  );
}

export default MyCourses;