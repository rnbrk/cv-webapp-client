import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import School from '@material-ui/icons/School';

import StyledPaper from './StyledPaper';
import TitleSection from './TitleSection';
import ItemStudy from './ItemStudy';

import CvContext from '../contexts/cv';
import { compareDateRange } from '../utils/compare';

const SectionStudies = ({ studies }) => {
  const { requestUpdatesCvModel } = useContext(CvContext);

  const [state, setState] = useState(studies);

  const updateItem = update => {
    const newListOfStudies = state.list.filter(study => study._id !== update._id).concat(update);
    const newState = { ...state, list: newListOfStudies };

    setState(newState);
    requestUpdatesCvModel({ studies: newState });
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
            .map(study => <ItemStudy key={study._id} study={study} setUpdates={updateItem} />)}
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
