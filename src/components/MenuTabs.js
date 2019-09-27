import React, { useState, useEffect } from 'react';
import { matchPath } from 'react-router-dom';
import history from '../routers/history';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  root: { flexGrow: 1 }
});

const MenuTabs = ({ items, location, createItem }) => {
  const classes = useStyles();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (location && location.pathname) {
      setActive(active => matchPathToActiveTab());
    }
  }, [location]);

  function handleChange(e, index) {
    setActive(index);
    history.push(`/cvs/${items[index]._id}?edit=true`);
  }

  function matchPathToActiveTab() {
    const active = items.findIndex(item =>
      matchPath(location.pathname, {
        path: `/cvs/${item._id}`,
        exact: item.exact || false
      })
    );

    return active;
  }

  return (
    <Paper className={classes.root}>
      <Grid container justify="center">
        <Tabs
          value={active}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {items.map((item, index) => (
            <Tab value={index} label={item.title} key={item._id} />
          ))}
        </Tabs>

        <IconButton
          aria-label="delete"
          className={classes.margin}
          aria-label="add new resume"
          onClick={createItem}
        >
          <AddIcon color="primary" />
        </IconButton>
      </Grid>
    </Paper>
  );
};

export default MenuTabs;
