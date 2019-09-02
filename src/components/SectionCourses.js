import React from 'react';
import PropTypes from 'prop-types';
import Book from '@material-ui/icons/Book';

import StyledPaper from './StyledPaper';
import TitleSection from './TitleSection';
import ItemCourse from './ItemCourse';

export const sortByName = (a, b) => (a.name > b.name ? 1 : -1);

const SectionCourses = ({ courses }) => (
  <section>
    <StyledPaper>
      <TitleSection title={'Cursussen'} Icon={Book} />
      {courses &&
        courses.list
          .sort(sortByName)
          .map(course => <ItemCourse course={course} key={course._id} />)}
    </StyledPaper>
  </section>
);

SectionCourses.propTypes = {
  courses: PropTypes.object.isRequired
};

SectionCourses.defaultProps = {
  courses: {
    list: []
  }
};

export default SectionCourses;
