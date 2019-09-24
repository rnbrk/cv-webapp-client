import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Book from '@material-ui/icons/Book';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import StyledPaper from './StyledPaper';
import TitleSection from './TitleSection';
import ItemCourse from './ItemCourse';

import useRequest from '../hooks/useRequest';
import EditModeContext from '../contexts/editMode';
import CurrentCvContext from '../contexts/currentCv';
import AuthContext from '../contexts/auth';

export const sortByName = (a, b) => (a.name > b.name ? 1 : -1);

const SectionCourses = ({ courses }) => {
  const [state, setState] = useState(courses);
  const { requestUpdatesCvModel, currentCv } = useContext(CurrentCvContext);
  const [editMode] = useContext(EditModeContext);
  const [auth] = useContext(AuthContext);
  const [response, makeRequest] = useRequest(process.env.NODE_HOST);

  const createCourse = async () => {
    const newCourse = await makeRequest(`/cvs/${currentCv}/courses`, 'POST', {
      headers: {
        authorization: `Bearer ${auth.token}`
      }
    });

    const newListOfCourses = state.list.concat([newCourse]);
    const newState = { ...state, list: newListOfCourses };

    setState(newState);
  };

  const deleteCourse = async id => {
    const newListOfStudies = state.list.filter(course => course._id !== id);
    const newState = { ...state, list: newListOfStudies };

    await makeRequest(`/cvs/${currentCv}/courses/${id}`, 'DELETE', {
      headers: {
        authorization: `Bearer ${auth.token}`
      }
    });
    setState(newState);
  };

  const updateStudy = async update => {
    const newListOfStudies = state.list.filter(study => study._id !== update._id).concat(update);
    const newState = { ...state, list: newListOfStudies };

    await makeRequest(`/cvs/${currentCv}/courses/${update._id}`, 'PATCH', {
      headers: {
        authorization: `Bearer ${auth.token}`
      },
      data: update
    });

    setState(newState);
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
            .map(course => (
              <ItemCourse
                course={course}
                key={course._id}
                setUpdates={updateStudy}
                deleteCourse={deleteCourse}
              />
            ))}

        {editMode ? (
          <Grid justify="center" container>
            <Button
              variant="contained"
              color="primary"
              aria-label="Add new education"
              onClick={createCourse}
            >
              Add course
            </Button>
          </Grid>
        ) : null}
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
