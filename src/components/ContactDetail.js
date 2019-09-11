import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import EditableText from '../components/EditableText';

const styles = {
  infoBar: {
    marginBottom: 32
  },
  infoIcon: {
    marginRight: 8
  }
};

const ContactDetail = ({ classes, text, Icon, href, id, editable = true, requestUpdates }) => {
  return (
    <Grid item container xs direction="row" justify="center" alignItems="center">
      <Icon color="primary" className={classes.infoIcon} />

      {href ? (
        <Link variant="body1" color="primary" href={href} rel="noopener">
          <div>wtf</div>
        </Link>
      ) : (
        <Typography variant="body1">
          <EditableText
            initialContent={text}
            submitCallback={requestUpdates}
            disabled={!editable}
            tagName="span"
            id={id}
          />
        </Typography>
      )}
    </Grid>
  );
};

export default withStyles(styles)(ContactDetail);
