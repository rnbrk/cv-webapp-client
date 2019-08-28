import React from 'react';

import AboutMe from './AboutMe';
import StyledPaper from './StyledPaper';
import ContactDetails from './ContactDetails';
import Portrait from './Portrait';

const SectionProfile = ({ profile, photo }) => (
  <StyledPaper>
    <ContactDetails
      email={profile.email}
      phoneNumber={profile.phoneNumber}
      website={profile.website}
    />
    <Portrait name={profile.fullName} title={profile.profession} _id={profile._id} photo={photo} />
    <AboutMe paragraph={profile.paragraph} />
  </StyledPaper>
);

export default SectionProfile;
