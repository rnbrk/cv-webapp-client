import React from 'react';

import { Grid, Link, Typography } from '@material-ui/core';
import { AlternateEmail, LocalPhone, Link as LinkIcon } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import ContactDetail from './ContactDetail';

const styles = {
  infoBar: {
    marginBottom: 32
  },
  infoIcon: {
    marginRight: 8
  }
};

const ContactDetails = ({ classes, email, phoneNumber, website }) => (
  <Grid container className={classes.infoBar}>
    <ContactDetail text={email} Icon={AlternateEmail} />
    <ContactDetail text={phoneNumber} Icon={LocalPhone} />
    <ContactDetail text={website && website.name} Icon={LinkIcon} href={website && website.link} />
  </Grid>
);

export default withStyles(styles)(ContactDetails);
