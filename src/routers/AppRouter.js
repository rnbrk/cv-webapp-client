import React, { useContext, useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';

import CV from '../components/CV';
import TopBar from '../components/TopBar';
import NotFound from '../components/NotFound';
import ScreenLogin from '../components/ScreenLogin';
import ScreenSignup from '../components/ScreenSignup';
import useAuthHandler from '../hooks/useAuthHandler';
import AuthContext from '../contexts/auth';
import CvsContext from '../contexts/cvs';
import EditModeContext from '../contexts/editMode';
import { getBooleanFromUrlQuery } from '../utils/utils';

const mainPage = ({ match, location }) => {
  const [auth, dispatch] = useContext(AuthContext);
  const [cvs, setCvs] = useContext(CvsContext);
  const [editMode, setEditMode] = useState(getBooleanFromUrlQuery(location.search, 'edit'));

  useEffect(() => {
    if (auth.cvs) {
      setCvs(auth.cvs);
    }
  }, [auth.cvs]);

  useEffect(() => {
    if (location && location.search) {
      setEditMode(getBooleanFromUrlQuery(location.search, 'edit'));
    }
  }, [location]);

  return (
    <EditModeContext.Provider value={[editMode, setEditMode]}>
      {/* Show CV page*/}
      <Route
        path="/cvs/:id"
        render={() => (
          <React.Fragment>
            <TopBar currentCv={match.params.id} location={location} />
            <CV currentCv={match.params.id} />
          </React.Fragment>
        )}
      />

      {/* Show dashboard page */}
      <Route
        path="/"
        exact
        render={() => (
          <React.Fragment>
            <TopBar />
            <div>Dashboard page</div>
          </React.Fragment>
        )}
      />
    </EditModeContext.Provider>
  );
};

const AppRouter = () => {
  const [auth, dispatch] = useAuthHandler();
  const [cvs, setCvs] = useState([]);

  return (
    <AuthContext.Provider value={[auth, dispatch]}>
      <CvsContext.Provider value={[cvs, setCvs]}>
        <Router history={history}>
          <Switch>
            <Route path={['/', '/cvs/:id']} exact component={mainPage} />
            <Route path="/login" exact component={ScreenLogin} />
            <Route path="/signup" exact component={ScreenSignup} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </CvsContext.Provider>
    </AuthContext.Provider>
  );
};

export default AppRouter;
