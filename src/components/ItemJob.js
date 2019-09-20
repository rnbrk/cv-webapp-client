import React, { useContext, useState } from 'react';
import uuid from 'uuid';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
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

const ItemJob = ({ job, classes, timelineStyles, setUpdates }) => {
  const [editMode] = useContext(EditModeContext);

  const [state, setState] = useState(job);
  const updateJob = (e, content, id) => {
    const newState = {
      ...state,
      [id]: content
    };
    console.log('newState', newState);
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

  return (
    <article>
      <Grid container alignItems="stretch">
        <Timeline startDate={job.startDate} endDate={job.endDate} {...timelineStyles} />
        <Grid item xs={10} className={classes.jobItem}>
          <TitleItem
            title={job.name}
            subtitle={job.employerName}
            titleName="name"
            subtitleName="employerName"
            setUpdates={updateJob}
          />
          <Typography variant="body1" align="left" component="span">
            <EditableText
              initialContent={job.description}
              submitCallback={updateJob}
              disabled={!editMode}
              id="description"
              multiline
            />
          </Typography>

          <List>
            {job.responsibilities.map((respo, index) => (
              <div key={uuid()}>
                <ListItem>
                  <Check color="primary" />
                  <ListItemText
                    primary={
                      <EditableText
                        initialContent={respo}
                        submitCallback={updateRespo}
                        disabled={!editMode}
                        id={`${index}-respo`}
                      />
                    }
                  />
                </ListItem>
              </div>
            ))}
          </List>
        </Grid>
      </Grid>
    </article>
  );
};

export default withStyles(styles)(ItemJob);
