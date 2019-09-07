import React, { useContext } from 'react';
import { Link, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Redirect } from 'react-router-dom';
import PrivateRoute from '../routers/PrivateRoute';

import MenuTabs from './MenuTabs';

import AuthContext from '../contexts/auth';
import EditModeContext from '../contexts/editMode';
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

const TopBar = ({ currentCv, editMode }) => {
  const [auth, dispatch] = useContext(AuthContext);
  const isAuthenticated = () => !!auth._id;

  const classes = useStyles();

  const ViewMode = props => (
    <Box>
      {isAuthenticated() ? (
        <Box>
          <Button
            color="inherit"
            onClick={() => {
              dispatch(logout());
            }}
          >
            Log out
          </Button>
        </Box>
      ) : (
        <Box>
          <Button
            color="inherit"
            onClick={() => dispatch(login({ email: 'ron@web.dev', password: '12345abc' }))}
          >
            Log in
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              dispatch(createUser({ email: 'support@microsoft.com', password: 'b1llg4t3zZz' }));
            }}
          >
            Sign up
          </Button>
        </Box>
      )}

      <Button component={Link} to={`/cvs/${currentCv}/edit`} color="secondary" variant="contained">
        Edit
      </Button>
    </Box>
  );

  const EditMode = props => (
    <Box>
      <Box>
        <Button
          color="inherit"
          onClick={() => {
            dispatch(logout());
          }}
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
      items={auth.cvs || []}
      initialValue={auth.cvs.findIndex(item => item._id === currentCv)}
    />
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            CV Web app
          </Typography>
          {editMode ? <EditMode /> : <ViewMode />}
        </Toolbar>
      </AppBar>

      {editMode && isAuthenticated() && <EditModeMenuTabs />}
    </div>
  );
};

export default TopBar;
