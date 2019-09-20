import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Build from '@material-ui/icons/Build';

import { compareDateRange } from '../utils/compare';
import setTimelineStyles from '../styles/setTimelineStyles';

import StyledPaper from './StyledPaper';
import TitleSection from './TitleSection';
import ItemJob from './ItemJob';

import CvContext from '../contexts/cv';

const SectionJobs = ({ jobs }) => {
  const [state, setState] = useState(jobs);
  const { requestUpdatesCvModel } = useContext(CvContext);

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
              />
            ))}
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

export default SectionJobs;
