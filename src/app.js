import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';

import useAuthHandler from './hooks/useAuthHandler';
import useFileLoader from './hooks/useFileLoader';

import CV from './components/CV';
import Loading from './components/Loading';
import SectionProfile from './components/SectionProfile';
import SectionJobs from './components/SectionJobs';
import SectionStudies from './components/SectionStudies';
import SectionCourses from './components/SectionCourses';

const DOMAIN = `http://localhost:3000`;

const styles = theme =>
  console.log(theme) || {
    form: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-evenly' },
    paper: {
      padding: 64,
      margin: 16
    }
  };

const App = props => {
  const [currentCv, setCurrentCv] = useState(null);
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [studies, setStudies] = useState(null);
  const [courses, setCourses] = useState(null);

  const { userProfile, auth, cvs } = useAuthHandler(`${DOMAIN}/users/login`, {
    email: 'ron@web.dev',
    password: '12345abc'
  });

  const handleGetCvs = async () => {
    try {
      console.log(userProfile);
      const response = await axios({
        url: `${DOMAIN}/cvs/${userProfile.cvs[0]._id}`,
        method: 'get'
      });

      setCurrentCv(response.data);

      const profileData = {
        ...response.data.profile,
        ...userProfile
      };

      setProfile(profileData);
      setJobs(response.data.jobs);
      setStudies(response.data.studies);
      setCourses(response.data.courses);
      console.log(response.data);
    } catch (e) {
      console.error('Error', e);
    }
  };

  const photo = useFileLoader(`${DOMAIN}/users/${auth._id}/photo`);

  return (
    <main>
      <Box>
        <Button variant="contained" onClick={auth.login}>
          Log in
        </Button>

        <Button variant="contained" onClick={auth.logout}>
          Log out
        </Button>

        <Button variant="contained" onClick={auth.createAccount}>
          Create new account
        </Button>

        <Button variant="contained" onClick={auth.deleteAccount}>
          Delete account
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            auth.updateAccount({
              firstName: 'Luke',
              lastName: 'Skywalker'
            });
          }}
        >
          Update account
        </Button>

        <Button variant="contained" onClick={auth.getToken}>
          Get token
        </Button>
      </Box>

      <Box>
        <Button variant="contained" color="secondary" onClick={handleGetCvs}>
          Get CVs
        </Button>
      </Box>

      {jobs && (
        <CV>
          <SectionProfile profile={profile} photo={photo.file} />
          <SectionJobs jobs={jobs} />
          <SectionStudies studies={studies} />
          <SectionCourses courses={courses} />
        </CV>
      )}
    </main>
  );

  return <Loading />;
};

export default withStyles(styles)(App);
