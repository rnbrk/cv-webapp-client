import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { login, logout, logoutAll, createUser, deleteUser, updatePassword } from './actions/auth';
import useAuthHandler from './hooks/useAuthHandler';
import useFileLoader from './hooks/useFileLoader';

import CV from './components/CV';
import Loading from './components/Loading';
import SectionProfile from './components/SectionProfile';
import SectionJobs from './components/SectionJobs';
import SectionStudies from './components/SectionStudies';
import SectionCourses from './components/SectionCourses';
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
  const [jobs, setJobs] = useState(undefined);
  const [studies, setStudies] = useState(undefined);
  const [courses, setCourses] = useState(undefined);
  const [photo, getPhoto, deletePhoto] = useFileLoader(DOMAIN);

  const [auth, dispatch] = useAuthHandler();

  // email: 'ron@web.dev',
  // password: '12345abc'

  const handleGetCvs = async () => {
    try {
      const response = await axios({
        url: `${DOMAIN}/cvs/${cvs[0]._id}`,
        method: 'get'
      });

      setCurrentCv(response.data);
      setProfile({ ...response.data.profile, ...userProfile });
      setJobs(response.data.jobs);
      setStudies(response.data.studies);
      setCourses(response.data.courses);
    } catch (e) {
      console.error('Error', e);
    }
  };

  // useEffect(() => {
  //   auth.login();
  // }, []);

  // useEffect(() => {
  //   if (userProfile) handleGetCvs();
  // }, [cvs]);

  // useEffect(() => {
  //   if (auth._id) getPhoto(`/users/${auth._id}/photo`);
  // }, [auth._id]);

  // if (!auth._id) {
  //   return (
  //     <AuthContext.Provider value={[auth, dispatch]}>
  //       <ScreenLogin />
  //     </AuthContext.Provider>
  //   );
  // }

  return (
    <main>
      <Box>
        <Button
          variant="contained"
          onClick={() => dispatch(login({ email: 'ron@web.dev', password: '12345abc' }))}
        >
          Log in
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Log out
        </Button>

        <Button variant="contained" onClick={() => console.log(auth)}>
          Show auth
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            dispatch(createUser({ email: 'support@microsoft.com', password: 'b1llg4t3zZz' }));
          }}
        >
          Create new account
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            dispatch(deleteUser());
          }}
        >
          Delete account
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            dispatch(updatePassword({ firstName: 'Steve', lastName: 'Ballmer' }));
          }}
        >
          Update password
        </Button>
      </Box>

      {/*
      <Box>
        <Button variant="contained" color="secondary" onClick={handleGetCvs}>
          Get CVs
        </Button>
      </Box>

      <Box>
        <Button
          variant="contained"
          onClick={() => {
            getPhoto(`/users/${auth._id}/photo`);
          }}
        >
          Get photo
        </Button>

        <Button
          variant="contained"
          onClick={async () => {
            const token = await auth.getToken();
            deletePhoto(`/users/photo`, token);
          }}
        >
          Delete photo
        </Button>
      </Box>
        */}

      {jobs ? (
        <CV>
          <SectionProfile profile={profile} photo={photo} />
          <SectionJobs jobs={jobs} />
          <SectionStudies studies={studies} />
          <SectionCourses courses={courses} />
        </CV>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default withStyles(styles)(App);
