import React, { useCallback, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import SectionProfile from '../components/SectionProfile';
import SectionJobs from '../components/SectionJobs';
import SectionStudies from '../components/SectionStudies';
import SectionCourses from '../components/SectionCourses';
import Loading from '../components/Loading';

import { withRouter } from 'react-router';
import useRequest from '../hooks/useRequest';
import { generateBlobURL } from '../utils/utils';

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

const CV = ({ classes, match }) => {
  const [response, makeRequest] = useRequest(DOMAIN);
  const [fileResponse, makeFileRequest] = useRequest(DOMAIN);
  const [photo, setPhoto] = useState(null);

  const handleRequest = useCallback(() => makeRequest(`/cvs/${match.params.id}`), [
    match.params.id
  ]);

  const handleFileRequest = useCallback(() => {
    makeFileRequest(`users/${response.data.user}/photo`, 'GET', { responseType: 'blob' });
  }, [response.status]);

  useEffect(() => {
    handleRequest();
  }, []);

  useEffect(() => {
    if (response.status === 'SUCCESS') {
      handleFileRequest();
    }
  }, [response.status]);

  useEffect(() => {
    if (fileResponse.status === 'SUCCESS') {
      setPhoto(generateBlobURL(fileResponse.data));
    }
  }, [fileResponse.status]);

  return (
    <Container maxWidth="md">
      {response.status === 'SUCCESS' && (
        <Box bgcolor="#EEEEEE" className={classes.root}>
          <SectionProfile profile={{ ...response.data.profile, ...userData }} photo={photo} />
          <SectionJobs jobs={response.data.jobs} />
          <SectionStudies studies={response.data.studies} />
          <SectionCourses courses={response.data.courses} />
        </Box>
      )}

      {response.status === 'FETCHING' && <Loading />}

      {response.status === 'LOADING' && <div>Error!</div>}
    </Container>
  );
};

export default withStyles(styles)(withRouter(CV));
