import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import AboutMe from './AboutMe';
import StyledPaper from './StyledPaper';
import ContactDetails from './ContactDetails';
import Portrait from './Portrait';

const styles = {
  aboutme: {
    margin: '0 auto',
    marginTop: 32,
    borderTop: '1px solid #999999',
    paddingTop: 16,
    width: '70%'
  }
};

const SectionProfile = ({ profile }) => (
  <StyledPaper>
    <ContactDetails
      email={profile.email}
      phoneNumber={profile.phoneNumber}
      website={profile.website}
    />
    <Portrait name={profile.fullName} title={profile && profile.profession} />
    <AboutMe paragraph={profile.paragraph} />
  </StyledPaper>
);

export default withStyles(styles)(SectionProfile);
