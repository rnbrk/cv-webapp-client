import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

import useAuthHandler from './hooks/useAuthHandler';
import useFileLoader from './hooks/useFileLoader';

import TopBar from './components/TopBar';
import CV from './components/CV';
import Loading from './components/Loading';

import ScreenLogin from './components/ScreenLogin';

import AuthContext from './contexts/auth';

const DOMAIN = `http://localhost:3000`;

const styles = theme =>
  console.log(theme) || {
    form: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-evenly' },
    paper: {
      padding: 64,
      margin: 16
    }
  };

const App = () => {
  const [cv, setCv] = useState(undefined);
  const [photo, getPhoto] = useFileLoader(DOMAIN);
  const [auth, dispatch] = useAuthHandler();

  // email: 'ron@web.dev',
  // password: '12345abc'

  const handleGetCvs = async () => {
    try {
      const res = await axios({
        url: `${DOMAIN}/cvs/5d49e7123492066d3e8aa1d2`,
        method: 'GET'
      });

      setCv(res.data);
    } catch (e) {
      console.error('Error', e);
    }
  };

  useEffect(() => {
    handleGetCvs();
  }, []);

  useEffect(() => {
    getPhoto(`users/5d65017606f4421fab1571d5/photo`);
  }, []);

  // if (!auth._id) {
  //   return (
  //     <AuthContext.Provider value={[auth, dispatch]}>
  //       <ScreenLogin />
  //     </AuthContext.Provider>
  //   );
  // }

  return (
    <main>
      <AuthContext.Provider value={[auth, dispatch]}>
        <TopBar />
      </AuthContext.Provider>

      {cv ? <CV cv={cv} photo={photo} /> : <Loading />}
    </main>
  );
};

export default withStyles(styles)(App);
