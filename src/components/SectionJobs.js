import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Build from '@material-ui/icons/Build';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import { compareDateRange } from '../utils/compare';
import setTimelineStyles from '../styles/setTimelineStyles';
import { secondaryColor } from '../styles/theme';
import useRequest from '../hooks/useRequest';

import StyledPaper from './StyledPaper';
import TitleSection from './TitleSection';
import ItemJob from './ItemJob';

import CvContext from '../contexts/cv';
import AuthContext from '../contexts/auth';

const styles = {
  actionButton: {
    margin: '20px',
    border: `1px solid ${secondaryColor}`
  }
};

const SectionJobs = ({ jobs, classes }) => {
  const [state, setState] = useState(jobs);
  const { requestUpdatesCvModel, requestCreateJob, currentCv } = useContext(CvContext);
  const [response, makeRequest] = useRequest(process.env.NODE_HOST);
  const [auth] = useContext(AuthContext);

  const createJob = async () => {
    const newJob = await makeRequest(`/cvs/${currentCv}/jobs`, 'POST', {
      headers: {
        authorization: `Bearer ${auth.token}`
      }
    });

    const newListOfJobs = state.list.concat([newJob]);
    const newState = { ...state, list: newListOfJobs };

    setState(newState);
  };

  const deleteJob = id => {
    const newListOfJobs = state.list.filter(job => job._id !== id);
    const newState = { ...state, list: newListOfJobs };

    setState(newState);
    requestUpdatesCvModel({ jobs: newState });
  };

  const updateJob = update => {
    const newListOfJobs = state.list.filter(job => job._id !== update._id).concat(update);
    const newState = { ...state, list: newListOfJobs };

    setState(newState);
    requestUpdatesCvModel({ jobs: newState });
  };

  const updateTitle = (e, content, id) => {
    const newState = {
      ...state,
      [id]: content
    };
    setState(newState);
    requestUpdatesCvModel({ jobs: newState });
  };

  return (
    <section>
      <StyledPaper>
        <TitleSection title={state.title} Icon={Build} setUpdates={updateTitle} />
        {state &&
          state.list
            .sort(compareDateRange)
            .map((job, index) => (
              <ItemJob
                job={job}
                key={job._id}
                timelineStyles={setTimelineStyles(job, index, jobs.list)}
                setUpdates={updateJob}
                deleteJob={deleteJob}
              />
            ))}
        <Grid justify="center" container>
          <IconButton
            color="secondary"
            aria-label="add"
            edge="start"
            className={classes.actionButton}
            onClick={createJob}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </StyledPaper>
    </section>
  );
};

SectionJobs.propTypes = {
  jobs: PropTypes.object.isRequired
};

SectionJobs.defaultProps = {
  jobs: {
    list: []
  }
};

export default withStyles(styles)(SectionJobs);
