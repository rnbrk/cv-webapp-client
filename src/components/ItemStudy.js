import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import TitleItem from './TitleItem';
import Timeline from './Timeline';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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

const ItemStudy = ({ classes, study, setUpdates, deleteStudy }) => {
  const [state, setState] = useState(study);
  const [editMode] = useContext(EditModeContext);

  const update = (e, content, id) => {
    const newState = {
      ...state,
      [id]: content
    };
    setState(newState);
    setUpdates(newState);
  };

  const updateDates = ({ startDate, endDate }) => {
    const newState = {
      ...state,
      startDate,
      endDate
    };

    setState(newState);
    setUpdates(newState);
  };

  return (
    <article className={classes.totalItem}>
      <Grid container alignItems="stretch">
        <Timeline
          startDate={state.startDate}
          endDate={state.endDate}
          topStyle="unconnected"
          bottomStyle="unconnected"
          dateFormat="YYYY"
          setUpdates={updateDates}
        />
        <Grid item container xs={10}>
          <Grid item xs={11} className={classes.textPart}>
            <TitleItem
              title={state.name}
              subtitle={state.instituteName}
              titleName="name"
              subtitleName="instituteName"
              gutterBottom={false}
              setUpdates={update}
            />
          </Grid>

          {editMode ? (
            <Grid item xs={1}>
              <IconButton
                aria-label="delete"
                className={classes.margin}
                onClick={() => deleteStudy(study._id)}
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

export default withStyles(styles)(ItemStudy);
