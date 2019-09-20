import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import EditModeContext from '../contexts/editMode';
import MenuTabs from './MenuTabs';
import AuthContext from '../contexts/auth';
import { login, logout, createUser } from '../actions/auth';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1000
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const TopBar = ({ currentCv, location, match }) => {
  const [auth, dispatch] = useContext(AuthContext);
  const [editMode, setEditMode] = useContext(EditModeContext);
  const classes = useStyles();

  const loginAction = () => dispatch(login({ email: 'ron@web.dev', password: '12345abc' }));
  const logoutAction = () => dispatch(logout());
  const createUserAction = () =>
    dispatch(createUser({ email: 'support@microsoft.com', password: 'b1llg4t3zZz' }));

  const ViewMode = props => (
    <Box>
      {auth._id ? (
        <Box>
          <Button color="inherit" onClick={logoutAction}>
            Log out
          </Button>
        </Box>
      ) : (
        <Box>
          <Button color="inherit" onClick={loginAction}>
            Log in
          </Button>
          <Button color="inherit" onClick={createUserAction}>
            Sign up
          </Button>
        </Box>
      )}

      {auth._id && (
        <Button
          component={Link}
          to={`/cvs/${currentCv}?edit=true`}
          color="secondary"
          variant="contained"
        >
          Edit
        </Button>
      )}
    </Box>
  );

  const EditMode = props => (
    <Box>
      <Box>
        <Button
          color="inherit"
          component={Link}
          to={`/cvs/${currentCv}`}
          color="inherit"
          onClick={logoutAction}
        >
          Log out
        </Button>
      </Box>
      <Button component={Link} to={`/cvs/${currentCv}`} variant="contained" color="primary">
        View
      </Button>
    </Box>
  );

  const EditModeMenuTabs = () => (
    <MenuTabs
      location={location}
      match={match}
      items={auth.cvs || []}
      initialValue={auth.cvs || auth.cvs.findIndex(item => auth.cvs._id === currentCv)}
    />
  );

  if (editMode && !auth._id) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            CV Web app
          </Typography>
          {editMode ? EditMode() : ViewMode()}
        </Toolbar>
      </AppBar>

      {editMode && auth._id && EditModeMenuTabs()}
    </div>
  );
};

export default TopBar;
