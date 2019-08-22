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

const ContactDetails = props => (
  <Grid container className={props.classes.infoBar}>
    <ContactDetail text={'r.t.broek@hotmail.com'} Icon={AlternateEmail} />
    <ContactDetail text={'06 46 52 3636'} Icon={LocalPhone} />
    <ContactDetail text={'www.ronbroek.com'} Icon={LinkIcon} href="https://www.ronbroek.com" />
  </Grid>
);

export default withStyles(styles)(ContactDetails);
