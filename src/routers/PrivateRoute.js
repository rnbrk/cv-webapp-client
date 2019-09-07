import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../contexts/auth';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [auth] = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => (!!auth._id ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
