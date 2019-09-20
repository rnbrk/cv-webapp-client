import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Book from '@material-ui/icons/Book';

import StyledPaper from './StyledPaper';
import TitleSection from './TitleSection';
import ItemCourse from './ItemCourse';

import CvContext from '../contexts/cv';

export const sortByName = (a, b) => (a.name > b.name ? 1 : -1);

const SectionCourses = ({ courses }) => {
  const [state, setState] = useState(courses);
  const { requestUpdatesCvModel } = useContext(CvContext);

  const updateItem = update => {
    const newListOfCourses = state.list.filter(course => course._id !== update._id).concat(update);
    const newState = { ...state, list: newListOfCourses };

    setState(newState);
    requestUpdatesCvModel({ courses: newState });
  };

  const updateTitle = (e, content, id) => {
    const newState = {
      ...state,
      [id]: content
    };
    setState(newState);
    requestUpdatesCvModel({ courses: newState });
  };

  return (
    <section>
      <StyledPaper>
        <TitleSection title={state.title} Icon={Book} setUpdates={updateTitle} />
        {state &&
          state.list
            .sort(sortByName)
            .map(course => <ItemCourse course={course} key={course._id} setUpdates={updateItem} />)}
      </StyledPaper>
    </section>
  );
};

SectionCourses.propTypes = {
  courses: PropTypes.object.isRequired
};

SectionCourses.defaultProps = {
  courses: {
    list: []
  }
};

export default SectionCourses;
