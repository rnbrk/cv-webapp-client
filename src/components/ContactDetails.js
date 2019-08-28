import React from 'react';

import Grid from '@material-ui/core/Grid';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import LocalPhone from '@material-ui/icons/LocalPhone';
import Link from '@material-ui/icons/Link';
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
    {email && <ContactDetail text={email} Icon={AlternateEmail} />}
    {phoneNumber && <ContactDetail text={phoneNumber} Icon={LocalPhone} />}
    {website && (
      <ContactDetail
        text={website && website.name}
        Icon={LinkIcon}
        href={website && website.link}
      />
    )}
  </Grid>
);

export default withStyles(styles)(ContactDetails);
