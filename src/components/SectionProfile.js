import React from 'react';
import PropTypes from 'prop-types';

import AboutMe from './AboutMe';
import StyledPaper from './StyledPaper';
import ContactDetails from './ContactDetails';
import Portrait from './Portrait';

const SectionProfile = ({ profile, photo }) => {
  return (
    <StyledPaper>
      <ContactDetails
        email={profile.email}
        phoneNumber={profile.phoneNumber}
        website={profile.website}
      />
      <Portrait
        name={profile.fullName}
        title={profile.profession}
        _id={profile._id}
        photo={photo}
      />
      <div></div>
      <AboutMe paragraph={profile && profile.paragraph} />
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
