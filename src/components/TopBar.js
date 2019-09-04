import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AuthContext from '../contexts/auth';
import CurrentCvContext from '../contexts/currentCv';
import EditModeContext from '../contexts/editMode';
import { login, logout, logoutAll, createUser, deleteUser, updatePassword } from '../actions/auth';

const TopBar = () => {
  const [auth, dispatch] = useContext(AuthContext);
  const editMode = useContext(EditModeContext);
  const currentCv = useContext(CurrentCvContext);
  const isAuthenticated = () => !!auth._id;

  return (
    <div>
      {isAuthenticated() ? (
        <Box bgcolor="yellow">
          <Button
            variant="contained"
            onClick={() => {
              dispatch(logout());
            }}
          >
            Log out
          </Button>

          <Button variant="contained" onClick={() => console.log(auth)}>
            Show auth
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              dispatch(deleteUser());
            }}
          >
            Delete account
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              dispatch(updatePassword({ firstName: 'Steve', lastName: 'Ballmer' }));
            }}
          >
            Update password
          </Button>

          {editMode ? (
            <Button component={Link} to={`/cvs/${currentCv}`} variant="contained" color="primary">
              View
            </Button>
          ) : (
            <Button
              component={Link}
              to={`/cvs/${currentCv}/edit`}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
          )}
        </Box>
      ) : (
        <Box bgcolor="red">
          <Button
            variant="contained"
            onClick={() => dispatch(login({ email: 'ron@web.dev', password: '12345abc' }))}
          >
            Log in
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              dispatch(createUser({ email: 'support@microsoft.com', password: 'b1llg4t3zZz' }));
            }}
          >
            Sign up
          </Button>

          <Button variant="contained" onClick={() => console.log(auth)}>
            Show auth
          </Button>
        </Box>
      )}
    </div>
  );
};

export default TopBar;
