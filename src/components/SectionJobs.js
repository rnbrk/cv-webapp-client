import React from 'react';
import { Build } from '@material-ui/icons';

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

export default SectionJobs;
