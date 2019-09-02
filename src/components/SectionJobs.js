import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Build from '@material-ui/icons/Build';

import { compareDateRange } from '../utils/compare';
import setTimelineStyles from '../styles/setTimelineStyles';

import StyledPaper from './StyledPaper';
import TitleSection from './TitleSection';
import ItemJob from './ItemJob';

const SectionJobs = ({ jobs }) => (
  <section>
    <StyledPaper>
      <TitleSection title={'Werkervaring'} Icon={Build} />
      {jobs &&
        jobs.list
          .sort(compareDateRange)
          .map((job, index) => (
            <ItemJob
              job={job}
              key={job._id}
              timelineStyles={setTimelineStyles(job, index, jobs.list)}
            />
          ))}
    </StyledPaper>
  </section>
);

SectionJobs.propTypes = {
  jobs: PropTypes.object.isRequired
};

SectionJobs.defaultProps = {
  jobs: {
    list: []
  }
};

export default SectionJobs;
