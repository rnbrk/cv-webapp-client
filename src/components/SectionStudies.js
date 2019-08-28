import React from 'react';
import uuid from 'uuid';
import School from '@material-ui/icons/School';

import StyledPaper from './StyledPaper';
import TitleSection from './TitleSection';
import ItemStudy from './ItemStudy';

const SectionStudies = ({ studies }) => (
  <section>
    <StyledPaper>
      <TitleSection title={'Opleiding'} Icon={School} />
      {studies && studies.list.map(study => <ItemStudy key={uuid()} study={study} />)}
    </StyledPaper>
  </section>
);

export default SectionStudies;
