import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../contexts/auth';

export const PrivateRoute = ({ Component, ...rest }) => {
  const [auth] = useContext(AuthContext);
  const isAuthenticated = () => !!auth._id;

  return (
    <Route
      {...rest}
      render={props => (isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
