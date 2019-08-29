import React from 'react';
import PropTypes from 'prop-types';
import Build from '@material-ui/icons/Build';

import StyledPaper from './StyledPaper';
import TitleSection from './TitleSection';
import ListItemJobs from './ListItemJobs';

const SectionJobs = ({ jobs }) => (
  <section>
    <StyledPaper>
      <TitleSection title={'Werkervaring'} Icon={Build} />

      <ListItemJobs array={jobs.list} />
    </StyledPaper>
  </section>
);

SectionJobs.propTypes = {
  jobs: PropTypes.object.isRequired
};

SectionJobs.defaultProps = {
  jobs: {}
};

export default SectionJobs;
