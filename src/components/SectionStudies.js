import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import School from '@material-ui/icons/School';
import Button from '@material-ui/core/Button';

import StyledPaper from './StyledPaper';
import TitleSection from './TitleSection';
import ItemStudy from './ItemStudy';

import useRequest from '../hooks/useRequest';
import EditModeContext from '../contexts/editMode';
import CurrentCvContext from '../contexts/currentCv';
import AuthContext from '../contexts/auth';
import { compareDateRange } from '../utils/compare';

const SectionStudies = ({ studies }) => {
  const { requestUpdatesCvModel, currentCv } = useContext(CurrentCvContext);
  const [editMode] = useContext(EditModeContext);
  const [auth] = useContext(AuthContext);

  const [state, setState] = useState(studies);
  const [response, makeRequest] = useRequest(process.env.NODE_HOST);

  const createStudy = async () => {
    const newStudy = await makeRequest(`/cvs/${currentCv}/studies`, 'POST', {
      headers: {
        authorization: `Bearer ${auth.token}`
      }
    });

    const newListOfStudies = state.list.concat([newStudy]);
    const newState = { ...state, list: newListOfStudies };

    setState(newState);
  };

  const deleteStudy = async id => {
    const newListOfStudies = state.list.filter(study => study._id !== id);
    const newState = { ...state, list: newListOfStudies };

    await makeRequest(`/cvs/${currentCv}/studies/${id}`, 'DELETE', {
      headers: {
        authorization: `Bearer ${auth.token}`
      }
    });
    setState(newState);
  };

  const updateStudy = async update => {
    const newListOfStudies = state.list.filter(study => study._id !== update._id).concat(update);
    const newState = { ...state, list: newListOfStudies };

    await makeRequest(`/cvs/${currentCv}/studies/${update._id}`, 'PATCH', {
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
    requestUpdatesCvModel({ studies: newState });
  };

  return (
    <section>
      <StyledPaper>
        <TitleSection title={state.title} Icon={School} setUpdates={updateTitle} />
        {state &&
          state.list
            .sort(compareDateRange)
            .map(study => (
              <ItemStudy
                key={study._id}
                study={study}
                setUpdates={updateStudy}
                deleteStudy={deleteStudy}
              />
            ))}

        {editMode ? (
          <Grid justify="center" container>
            <Button
              variant="contained"
              color="primary"
              aria-label="Add new education"
              onClick={createStudy}
            >
              Add education
            </Button>
          </Grid>
        ) : null}
      </StyledPaper>
    </section>
  );
};

SectionStudies.propTypes = {
  studies: PropTypes.object.isRequired
};

SectionStudies.defaultProps = {
  studies: {
    list: []
  }
};

export default SectionStudies;
