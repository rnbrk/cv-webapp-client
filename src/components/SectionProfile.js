import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AboutMe from './AboutMe';
import StyledPaper from './StyledPaper';
import CvContext from '../contexts/cv';
import ContactDetails from './ContactDetails';
import Portrait from './Portrait';

const SectionProfile = ({ profile, photo }) => {
  const [state, setState] = useState(profile);
  const { requestUpdatesCvModel, requestUpdatesUserModel } = useContext(CvContext);

  const setUpdatesToUserModel = (e, content, id) => {
    const newState = {
      ...state,
      [id]: content
    };
    setState(newState);

    // Temporary fix
    // This requires a change in the backend to fix correctly
    const newProfileDataWithoutParagraph = { ...newState };
    delete newProfileDataWithoutParagraph.paragraph;
    delete newProfileDataWithoutParagraph.title;

    requestUpdatesUserModel(newProfileDataWithoutParagraph);
  };

  const setUpdatesToCvModel = updates => {
    const newState = { ...state, ...updates };
    setState(newState);

    // Temporary fix
    // This requires a change in the backend to fix correctly
    const onlyParagraph = { paragraph: newState.paragraph };

    requestUpdatesCvModel({ profile: onlyParagraph });
  };

  return (
    <StyledPaper>
      <ContactDetails
        email={state.email}
        phoneNumber={state.phoneNumber}
        website={state.website}
        setUpdates={setUpdatesToUserModel}
      />
      <Portrait
        fullName={state.fullName}
        profession={state.profession}
        _id={state._id}
        photo={photo}
        setUpdates={setUpdatesToUserModel}
      />
      <AboutMe paragraph={state.paragraph} setUpdates={setUpdatesToCvModel} />
    </StyledPaper>
  );
};

SectionProfile.propTypes = {
  profile: PropTypes.object,
  photo: PropTypes.string
};

SectionProfile.defaultProps = {
  profile: {}
};

export default SectionProfile;
