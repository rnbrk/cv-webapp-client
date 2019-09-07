import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import CV from '../components/CV';
import TopBar from '../components/TopBar';
import NotFound from '../components/NotFound';
import ScreenLogin from '../components/ScreenLogin';

import PrivateRoute from '../routers/PrivateRoute';

import useAuthHandler from '../hooks/useAuthHandler';
import AuthContext from '../contexts/auth';
import EditModeContext from '../contexts/editMode';
import CurrentCvContext from '../contexts/currentCv';

const AppRouter = () => {
  const [auth, dispatch] = useAuthHandler();

  return (
    <div>
      <BrowserRouter>
        {/*// TODO: Create a separate non exact route for TopBar to prevent rerender / remount */}

        {/*<Route path="/cvs/:id" render={({ match }) => {
          return (
            <AuthContext.Provider value={[auth, dispatch]}>
              <TopBar currentCv={match.params.id} editMode={editMode} />
            </AuthContext.Provider>
        }} /> */}

        <Switch>
          <Route path="/" exact render={() => <Redirect to="/cvs/5d49e7123492066d3e8aa1d2" />} />
          <Route
            path="/login"
            exact
            render={() => (
              <AuthContext.Provider value={[auth, dispatch]}>
                <ScreenLogin />
              </AuthContext.Provider>
            )}
          />
          <Route
            path="/cvs/:id"
            render={({ match }) => (
              <Route
                path="/cvs/:id/edit"
                // Using children isMatched will be null when the route is /cvs/:id without /edit
                // This is used for conditional logic inside TopBar to change the appearance based on View or Edit mode
                children={({ match: isMatched }) => {
                  const isAuthenticated = !!auth._id;
                  const editMode = !!isMatched;

                  if (editMode && !isAuthenticated) return <Redirect to="/login" />;

                  return (
                    <AuthContext.Provider value={[auth, dispatch]}>
                      <TopBar currentCv={match.params.id} editMode={editMode} />
                      <CV currentCv={match.params.id} />
                    </AuthContext.Provider>
                  );
                }}
              />
            )}
          />

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
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
