import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import authContext from './contexts/auth';
import { login, getCv } from './hooks/requests';

import CV from './components/CV';
import Loading from './components/Loading';
import SectionProfile from './components/SectionProfile';
import SectionSkills from './components/SectionSkills';

const styles = theme =>
  console.log(theme) || {
    form: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-evenly' },
    paper: {
      padding: 64,
      margin: 16
    }
  };

const App = props => {
  const [credentials, setCredentials] = useState({
    email: 'ron@web.dev',
    password: '12345abc'
  });
  const [refreshToken, setRefreshToken] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [cvs, setCvs] = useState(null);
  const [currentCv, setCurrentCv] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const response = await login(credentials);
        setRefreshToken(response.data.refreshToken);
        setToken(response.data.token);
        setUser(response.data.user);
        setCvs(response.data.user.cvs);
      } catch (e) {
        console.error('Error', e);
      }
    };
    handleLogin();
  }, []);

  useEffect(() => {
    const handleGetCvs = async () => {
      try {
        const response = await getCv(cvs[0]._id);
        setCurrentCv(response.data);

        const profileData = {
          ...response.data.profile,
          email: user.email,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          profession: user.profession,
          website: user.website
        };

        console.log(profileData);

        setProfile(profileData);
      } catch (e) {
        console.error('Error', e);
      }
    };

    if (cvs) {
      handleGetCvs();
    }
  }, [cvs]);

  if (profile) {
    return (
      <authContext.Provider value={{ token, refreshToken, user }}>
        <CV>
          <SectionProfile profile={profile} />
          <SectionSkills />
        </CV>
      </authContext.Provider>
    );
  }

  return <Loading />;
};

export default withStyles(styles)(App);
