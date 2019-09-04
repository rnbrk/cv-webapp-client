import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import CV from '../components/CV';
import TopBar from '../components/TopBar';
import NotFound from '../components/NotFound';
import ScreenLogin from '../components/ScreenLogin';

import useStorageHandler from '../hooks/useStorageHandler';
import useAuthHandler from '../hooks/useAuthHandler';
import AuthContext from '../contexts/auth';
import PrivateRoute from '../routers/PrivateRoute';

const AppRouter = () => {
  const [auth, dispatch] = useAuthHandler();
  const [storage, dispatchStorage] = useStorageHandler();

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
            render={({ match }) => (
              <div>
                <AuthContext.Provider value={[auth, dispatch]}>
                  <TopBar storage={[storage, dispatchStorage]} />
                </AuthContext.Provider>
                <CV cvId={match.params.id} />
              </div>
            )}
          />
          <AuthContext.Provider value={[auth, dispatch]}>
            <PrivateRoute
              path="/cvs/:id/edit"
              exact
              Component={({ match }) => (
                <div>
                  <h2>EDIT MODE</h2>
                  <AuthContext.Provider value={[auth, dispatch]}>
                    <TopBar />
                  </AuthContext.Provider>
                  <CV cvId={match.params.id} />
                </div>
              )}
            />
          </AuthContext.Provider>

          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
