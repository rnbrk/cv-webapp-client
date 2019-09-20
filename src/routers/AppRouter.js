import React, { useEffect, useState } from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom';
import history from './history';

import CV from '../components/CV';
import TopBar from '../components/TopBar';
import NotFound from '../components/NotFound';
import ScreenLogin from '../components/ScreenLogin';
import useAuthHandler from '../hooks/useAuthHandler';
import AuthContext from '../contexts/auth';
import EditModeContext from '../contexts/editMode';
import { getBooleanFromUrlQuery } from '../utils/utils';

const mainPage = ({ match, location }) => {
  const [auth, dispatch] = useAuthHandler();
  const [editMode, setEditMode] = useState(getBooleanFromUrlQuery(location.search, 'edit'));

  useEffect(() => {
    setEditMode(getBooleanFromUrlQuery(location.search, 'edit'));
  }, [location.search]);

  return (
    <EditModeContext.Provider value={[editMode, setEditMode]}>
      <AuthContext.Provider value={[auth, dispatch]}>
        <TopBar
          currentCv={match.params.id}
          search={location.search}
          location={location}
          match={match}
        />
        <CV currentCv={match.params.id} />
      </AuthContext.Provider>
    </EditModeContext.Provider>
  );
};

const loginPage = () => {
  const [auth, dispatch] = useAuthHandler();

  return (
    <AuthContext.Provider value={[auth, dispatch]}>
      <ScreenLogin />
    </AuthContext.Provider>
  );
};

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/cvs/5d49e7123492066d3e8aa1d2" />} />
        <Route path="/cvs/:id" component={mainPage} />
        <Route path="/login" exact component={loginPage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
