import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import TitleItem from './TitleItem';
import Dot from './Dot';

const styles = {
  totalItem: {
    marginTop: 32,
    marginBottom: 32
  },
  textPart: {
    paddingLeft: 32
  }
};

const ItemCourse = ({ classes, course, setUpdates }) => {
  const [state, setState] = useState(course);

  const update = (e, content, id) => {
    const newState = {
      ...state,
      [id]: content
    };
    setState(newState);
    setUpdates(newState);
  };

  return (
    <article className={classes.totalItem}>
      <Grid container alignItems="stretch">
        <Dot />
        <Grid item xs={10} className={classes.textPart}>
          <TitleItem
            title={state.name}
            subtitle={state.instituteName}
            gutterBottom={false}
            titleName="name"
            subtitleName="instituteName"
            setUpdates={update}
          />
        </Grid>
      </Grid>
    </article>
  );
};

export default withStyles(styles)(ItemCourse);
