import React from 'react';
import uuid from 'uuid';
import Book from '@material-ui/icons/Book';

import StyledPaper from './StyledPaper';
import TitleSection from './TitleSection';

import ItemCourse from './ItemCourse';

const SectionCourses = ({ courses }) => (
  <section>
    <StyledPaper>
      <TitleSection title={'Cursussen'} Icon={Book} />
      {courses && courses.list.map(course => <ItemCourse course={course} key={uuid()} />)}
    </StyledPaper>
  </section>
);

export default SectionCourses;
