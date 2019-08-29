import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuid from 'uuid';
import School from '@material-ui/icons/School';

import StyledPaper from './StyledPaper';
import TitleSection from './TitleSection';
import ItemStudy from './ItemStudy';

export const sortByDaterange = (a, b) => {
  const aCompareDate = a.endDate ? a.endDate : a.startDate;
  const bCompareDate = b.endDate ? b.endDate : b.startDate;

  return moment(aCompareDate).isBefore(bCompareDate) ? 1 : -1;
};

const SectionStudies = ({ studies }) => (
  <section>
    <StyledPaper>
      <TitleSection title={'Opleiding'} Icon={School} />
      {studies &&
        studies.list.sort(sortByDaterange).map(study => <ItemStudy key={uuid()} study={study} />)}
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
