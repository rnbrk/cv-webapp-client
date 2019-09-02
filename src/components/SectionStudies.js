import React from 'react';
import PropTypes from 'prop-types';
import School from '@material-ui/icons/School';

import { compareDateRange } from '../utils/compare';
import StyledPaper from './StyledPaper';
import TitleSection from './TitleSection';
import ItemStudy from './ItemStudy';

const SectionStudies = ({ studies }) => (
  <section>
    <StyledPaper>
      <TitleSection title={'Opleiding'} Icon={School} />
      {studies &&
        studies.list
          .sort(compareDateRange)
          .map(study => <ItemStudy key={study._id} study={study} />)}
    </StyledPaper>
  </section>
);

SectionStudies.propTypes = {
  studies: PropTypes.object.isRequired
};

SectionStudies.defaultProps = {
  studies: {
    list: []
  }
};

export default SectionStudies;
