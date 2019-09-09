import React, { useState, useEffect } from 'react';
import { matchPath } from 'react-router-dom';
import history from '../routers/history';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { isUndefined } from 'util';

const useStyles = makeStyles({
  root: { flexGrow: 1 }
});

const MenuTabs = ({ items, location, match }) => {
  const classes = useStyles();
  const [active, setActive] = useState(matchPathToActiveTab());

  useEffect(() => {
    setActive(active => matchPathToActiveTab());
  }, [location.pathname]);

  function handleChange(e, index) {
    setActive(index);
    setTimeout(() => history.push(`/cvs/${items[index]._id}?edit=true`), 1);
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
    </Paper>
  );
};

export default MenuTabs;
