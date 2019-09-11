import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AboutMe from './AboutMe';
import StyledPaper from './StyledPaper';
import CvContext from '../contexts/cv';
import ContactDetails from './ContactDetails';
import Portrait from './Portrait';

const SectionProfile = ({ profile, photo }) => {
  const [profileData, setProfileData] = useState(profile);
  const { requestUpdates, requestProfileUpdates } = useContext(CvContext);
  const setUpdates = updates => {
    const newProfile = { ...profileData, ...updates };
    setProfileData(newProfile);

    // Temporary fix:
    const onlyParagraph = { paragraph: newProfile.paragraph };

    requestUpdates({ profile: onlyParagraph });
  };

  return (
    <StyledPaper>
      <ContactDetails
        email={profileData.email}
        phoneNumber={profileData.phoneNumber}
        website={profileData.website}
        setUpdates={requestProfileUpdates}
      />
      <Portrait
        fullName={profileData.fullName}
        profession={profileData.profession}
        _id={profileData._id}
        photo={photo}
        setUpdates={requestProfileUpdates}
      />
      <AboutMe paragraph={profileData.paragraph} setUpdates={setUpdates} />
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
