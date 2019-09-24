import React, { useContext, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Check from '@material-ui/icons/Check';
import { withStyles } from '@material-ui/core/styles';

import TitleItem from './TitleItem';
import Timeline from './Timeline';

import EditableText from '../components/EditableText';
import EditModeContext from '../contexts/editMode';

const styles = {
  jobItem: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32
  }
};

const ItemJob = ({ job, classes, timelineStyles, setUpdates, deleteJob }) => {
  const [state, setState] = useState(job);
  const [editMode] = useContext(EditModeContext);
  

  const updateJob = (e, content, id) => {
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

  const updateRespo = (e, content, id) => {
    const newListOfRespos = [...job.responsibilities];
    newListOfRespos[parseInt(id, 10)] = content;
    const newState = { ...state, responsibilities: newListOfRespos };

    setState(newState);
    setUpdates(newState);
  };

  const deleteRespo = respoIndex => {
    const newState = {
      ...state,
      responsibilities: job.responsibilities.filter((respo, index) => index !== respoIndex)
    };
    setState(newState);
    setUpdates(newState);
  };

  const createRespo = () => {
    const newState = {
      ...state,
      responsibilities: job.responsibilities.concat('New responsibility.')
    };

    setState(newState);
    setUpdates(newState);
  };

  return (
    <article>
      <Grid container alignItems="stretch">
        <Timeline
          startDate={state.startDate}
          endDate={state.endDate}
          setUpdates={updateDates}
          {...timelineStyles}
        />
        <Grid item container xs={10} className={classes.jobItem}>
          <Grid item xs={11}>
            <TitleItem
              title={state.name}
              subtitle={state.employerName}
              titleName="name"
              subtitleName="employerName"
              setUpdates={updateJob}
            />
          </Grid>

          {editMode ? (
            <Grid item xs={1}>
              <IconButton
                aria-label="delete"
                className={classes.margin}
                onClick={() => deleteJob(job._id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Grid>
          ) : null}

          <Typography variant="body1" align="left" component="span">
            <EditableText
              initialContent={state.description}
              submitCallback={updateJob}
              disabled={!editMode}
              id="description"
              multiline
            />
          </Typography>

          <List>
            {job.responsibilities.map((respo, index) => {
              const respoId = `${index}-respo`;

              return (
                <div key={respoId}>
                  <ListItem>
                    <Check color="primary" />
                    <ListItemText
                      primary={
                        <EditableText
                          initialContent={respo}
                          submitCallback={updateRespo}
                          disabled={!editMode}
                          id={respoId}
                        />
                      }
                    />

                    {editMode ? (
                      <Grid item xs={1}>
                        <IconButton
                          aria-label="delete"
                          className={classes.margin}
                          onClick={() => deleteRespo(index)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Grid>
                    ) : null}
                  </ListItem>
                </div>
              );
            })}
            {editMode ? (
              <Grid item xs={1}>
                <IconButton aria-label="delete" className={classes.margin} onClick={createRespo}>
                  <AddIcon color="primary" />
                </IconButton>
              </Grid>
            ) : null}
          </List>
        </Grid>
      </Grid>
    </article>
  );
};

export default withStyles(styles)(ItemJob);
