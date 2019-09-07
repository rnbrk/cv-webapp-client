import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: { flexGrow: 1 }
});

const MenuTabs = ({ items }) => {
  const classes = useStyles();

  /**
   * This only uses props currently. The component keeps rerendering and resets the value to initialValue
   */
  const [value, setValue] = useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  useEffect(() => {
    console.log('value', value);
  }, [items]);

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {items.map((item, index) => (
          <Tab
            label={item.title}
            component={Link}
            to={`/cvs/${item._id}/edit`}
            key={item._id}
            value={index}
          />
        ))}
      </Tabs>
    </Paper>
  );
};

export default MenuTabs;
