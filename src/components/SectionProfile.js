import React from 'react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

const SectionProfile = props => (
  <StyledPaper>
    <ContactDetails />
    <Portrait />

    <Typography variant="body1" align="center" className={props.classes.aboutme} gutterBottom>
      Minantia non modo formaeque in meis acervo formaeque gravitate erat indigestaque habentia fixo
      mutatas aliud orbis retinebat qui non alta
    </Typography>
  </StyledPaper>
);

export default withStyles(styles)(SectionProfile);
