import React from 'react';
import { Container} from 'mdbreact';
import CourseGrid from './CourseGrid';

const MyCourses = () =>  {
  return(
    <Container className="m-5 p-5">
     <CourseGrid/>
    </Container>
  );
}

export default MyCourses;