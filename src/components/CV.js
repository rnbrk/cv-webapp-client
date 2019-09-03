import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import SectionProfile from '../components/SectionProfile';
import SectionJobs from '../components/SectionJobs';
import SectionStudies from '../components/SectionStudies';
import SectionCourses from '../components/SectionCourses';
import Loading from '../components/Loading';

import useFileLoader from '../hooks/useFileLoader';

const DOMAIN = `http://localhost:3000`;

const styles = {
  root: {
    margin: '0 auto',
    padding: 50
  }
};

const userData = {
  fullName: 'Ron Broek',
  profession: 'Web developer',
  phoneNumber: '+31 (0)6 46 52 3636',
  email: 'ron@web.dev'
};

const CV = ({ classes, cvId, userId }) => {
  const [cv, setCv] = useState(undefined);
  const [photo, getPhoto] = useFileLoader(DOMAIN);

  // email: 'ron@web.dev',
  // password: '12345abc'

  const handleGetCvs = async () => {
    try {
      const res = await axios({
        url: `${DOMAIN}/cvs/${cvId}`,
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
    if (cv) {
      getPhoto(`users/${cv.user}/photo`);
    }
  }, [cv]);

  return (
    <Container maxWidth="md">
      {cv ? (
        <Box bgcolor="#EEEEEE" className={classes.root}>
          <SectionProfile profile={{ ...cv.profile, ...userData }} photo={photo} />
          <SectionJobs jobs={cv.jobs} />
          <SectionStudies studies={cv.studies} />
          <SectionCourses courses={cv.courses} />
        </Box>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default withStyles(styles)(CV);
