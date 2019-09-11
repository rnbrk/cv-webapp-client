import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AlternateEmail from '@material-ui/icons/AlternateEmail';
import LocalPhone from '@material-ui/icons/LocalPhone';
import Link from '@material-ui/icons/Link';
import { withStyles } from '@material-ui/core/styles';

import ContactDetail from './ContactDetail';
import EditableText from '../components/EditableText';
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
  const [state, setState] = useState({ email, phoneNumber, website });
  const [editMode] = useContext(EditModeContext);

  const requestUpdates = (e, content, id) => {
    const newState = {
      ...state,
      [id]: content
    };
    console.log('newState', newState);
    setState(newState);
    setUpdates(newState);
  };

  return (
    <Grid container className={classes.infoBar}>
      {email && (
        <ContactDetail
          text={email}
          Icon={AlternateEmail}
          id="email"
          requestUpdates={requestUpdates}
          editable={false}
        />
      )}
      {phoneNumber && (
        <ContactDetail
          text={phoneNumber}
          Icon={LocalPhone}
          id="phoneNumber"
          requestUpdates={requestUpdates}
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
