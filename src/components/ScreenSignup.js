import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { Redirect, Link } from 'react-router-dom';

import AuthContext from '../contexts/auth';
import useInputField from '../hooks/useInputField';
import { createUser } from '../actions/auth';

const ScreenLogin = () => {
  const [auth, dispatch] = useContext(AuthContext);

  const fullNameInput = useInputField('Full name');
  const emailInput = useInputField('Email address');
  const passwordInput = useInputField('Password');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      createUser({
        fullName: fullNameInput.value,
        email: emailInput.value,
        password: passwordInput.value
      })
    );
  };

  if (auth._id) {
    return <Redirect to="/" />;
  }

  // TODO: What happens when sign up does not work (User already exists)

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create new user
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full name"
            name="fullName"
            autoFocus
            {...fullNameInput}
            disabled={auth.status === 'FETCHING'}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...emailInput}
            disabled={auth.status === 'FETCHING'}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...passwordInput}
            disabled={auth.status === 'FETCHING'}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={auth.status === 'FETCHING'}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2">
                {'Already have an account? Log in.'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default ScreenLogin;
