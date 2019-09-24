import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import TitleItem from './TitleItem';
import Dot from './Dot';

import EditModeContext from '../contexts/editMode';

const styles = {
  totalItem: {
    marginTop: 32,
    marginBottom: 32
  },
  textPart: {
    paddingLeft: 32
  }
};

const ItemCourse = ({ classes, course, setUpdates, deleteCourse }) => {
  const [state, setState] = useState(course);
  const [editMode] = useContext(EditModeContext);

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
        <Grid container item xs={10} className={classes.textPart}>
          <Grid item xs={11}>
            <TitleItem
              title={state.name}
              subtitle={state.instituteName}
              gutterBottom={false}
              titleName="name"
              subtitleName="instituteName"
              setUpdates={update}
            />
          </Grid>

          {editMode ? (
            <Grid item xs={1}>
              <IconButton
                aria-label="delete"
                className={classes.margin}
                onClick={() => deleteCourse(course._id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </article>
  );
};

export default withStyles(styles)(ItemCourse);
