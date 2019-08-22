import React, { useState } from 'react';
import uuid from 'uuid';

import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { AlternateEmail, Build, Delete, LocalPhone, Link as LinkIcon } from '@material-ui/icons';

import CV from './components/CV';
import SectionProfile from './components/SectionProfile';
import SectionSkills from './components/SectionSkills';

const styles = theme =>
  console.log(theme) || {
    form: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-evenly' },
    paper: {
      padding: 64,
      margin: 16
    }
  };

const App = props => {
  const [name, setName] = useState('Exercise');
  const [exercises, setExercises] = useState([
    { id: uuid(), title: 'Bench Press' },
    { id: uuid(), title: 'Deadlift' },
    { id: uuid(), title: 'Squats' }
  ]);

  const handleChange = e => {
    setName(e.target.value);
  };

  const handleCreate = e => {
    e.preventDefault();

    if (name) {
      setExercises([
        ...exercises,
        {
          title: name,
          id: uuid()
        }
      ]);
    }
  };

  const handleDelete = id => setExercises(exercises.filter(exercise => exercise.id !== id));

  return (
    <CV>
      <SectionProfile />
      <SectionSkills />

      <Paper className={props.classes.paper}>
        <form onSubmit={handleCreate} className={props.classes.form}>
          <TextField
            name="title"
            label="main"
            value={name}
            onChange={handleChange}
            margin="normal"
          />

          <Button type="submit" color="primary" variant="contained">
            Create
          </Button>
        </form>
        <List>
          {exercises.map(({ id, title }) => (
            <ListItem key={id}>
              <ListItemText primary={title} />
              <ListItemSecondaryAction>
                <IconButton color="primary" onClick={() => handleDelete(id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </CV>
  );
};

export default withStyles(styles)(App);
