import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import history from '../routers/history';
import EditModeContext from '../contexts/editMode';
import MenuTabs from './MenuTabs';
import AuthContext from '../contexts/auth';
import CvsContext from '../contexts/cvs';
import useRequest from '../hooks/useRequest';
import { logout } from '../actions/auth';

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

const TopBar = ({ currentCv, location }) => {
  const [auth, dispatch] = useContext(AuthContext);
  const [editMode, setEditMode] = useContext(EditModeContext);
  const [cvs, setCvs] = useContext(CvsContext);

  const classes = useStyles();
  const [response, makeRequest] = useRequest(process.env.NODE_HOST);

  const logoutAction = () => dispatch(logout());

  const createCv = async () => {
    const newCv = await makeRequest(`/cvs`, 'POST', {
      headers: {
        authorization: `Bearer ${auth.token}`
      }
    });

    setCvs(oldState => oldState.concat([newCv]));
    history.push(`/cvs/${newCv._id}?edit=true`);
  };

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
          <Button color="inherit" component={Link} to="/login">
            Log in
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign up
          </Button>
        </Box>
      )}

      {auth._id && (
        <Button onClick={() => setEditMode(true)} color="secondary" variant="contained">
          Edit
        </Button>
      )}
    </Box>
  );

  const EditMode = props => (
    <Box>
      <Box>
        <Button color="inherit" color="inherit" onClick={logoutAction}>
          Log out
        </Button>
      </Box>
      <Button onClick={() => setEditMode(false)} variant="contained" color="primary">
        View
      </Button>
    </Box>
  );

  const EditModeMenuTabs = () => (
    <MenuTabs
      location={location}
      items={cvs || []}
      initialValue={cvs || cvs.findIndex(cv => cv._id === currentCv)}
      createItem={createCv}
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
