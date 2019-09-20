import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import LocalPhone from '@material-ui/icons/LocalPhone';
import Link from '@material-ui/icons/Link';
import { withStyles } from '@material-ui/core/styles';

import ContactDetail from './ContactDetail';

import EditModeContext from '../contexts/editMode';

const styles = {
  infoBar: {
    marginBottom: 32
  },
  infoIcon: {
    marginRight: 8
  }
};

const ContactDetails = ({ classes, email, phoneNumber, website, setUpdates }) => {
  const [editMode] = useContext(EditModeContext);

  return (
    <Grid container className={classes.infoBar}>
      {email && (
        <ContactDetail
          text={email}
          Icon={AlternateEmail}
          id="email"
          setUpdates={setUpdates}
          editable={false}
        />
      )}
      {phoneNumber && (
        <ContactDetail
          text={phoneNumber}
          Icon={LocalPhone}
          id="phoneNumber"
          setUpdates={setUpdates}
          editable={editMode}
        />
      )}
      {/*website && (
      <ContactDetail text={website && website.name} Icon={Link} href={website && website.link} id="website" requestUpdates={requestUpdates}/>
    )*/}
    </Grid>
  );
};

export default withStyles(styles)(ContactDetails);
