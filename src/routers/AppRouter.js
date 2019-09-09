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

const AppRouter = () => {
  const [auth, dispatch] = useAuthHandler();

  const mainPage = ({ match, location }) => {
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

  const loginPage = () => (
    <AuthContext.Provider value={[auth, dispatch]}>
      <ScreenLogin />
    </AuthContext.Provider>
  );

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

/**
 * NEW INTEGRATED VERSION
 */

/*
 
<Route path="" exact component={} />
          <PrivateRoute path="/edit" exact isAuthenticated={!!auth._id} component={} />

 */

/**
 * VIEW MODE
 */

/*

<Route
            path="/cvs/:id"
            exact
            component={({ match }) => {
              console.log('match View mode', match.params.id);

              return (
                <div>
                  <CurrentCvContext.Provider value={match.params.id}>
                    <AuthContext.Provider value={[auth, dispatch]}>
                      <EditModeContext.Provider value={false}>
                        <TopBar />
                      </EditModeContext.Provider>
                    </AuthContext.Provider>
                  </CurrentCvContext.Provider>
                  <CV currentCv={match.params.id} />
                </div>
              );
            }}
          />


 */

/**
 * EDIT MODE
 */
/*

        <AuthContext.Provider value={[auth, dispatch]}>
            <PrivateRoute
              path="/cvs/:id/edit"
              exact
              Component={({ match }) => {
                console.log('match Edit mode', match.params.id);

                return (
                  <div>
                    <CurrentCvContext.Provider value={match.params.id}>
                      <AuthContext.Provider value={[auth, dispatch]}>
                        <EditModeContext.Provider value={true}>
                          <TopBar />
                        </EditModeContext.Provider>
                      </AuthContext.Provider>
                    </CurrentCvContext.Provider>
                    <CV currentCv={match.params.id} />
                  </div>
                );
              }}
            />
          </AuthContext.Provider>

          */
