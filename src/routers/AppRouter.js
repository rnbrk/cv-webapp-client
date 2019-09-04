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
            exact
            component={({ match }) => {
              console.log('match View mode', match.params.id);

              return (
                <div>
                  <h2>VIEW MODE</h2>
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
          <AuthContext.Provider value={[auth, dispatch]}>
            <PrivateRoute
              path="/cvs/:id/edit"
              exact
              Component={({ match }) => {
                console.log('match Edit mode', match.params.id);

                return (
                  <div>
                    <h2>EDIT MODE</h2>
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

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
