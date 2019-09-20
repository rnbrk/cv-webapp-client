import React, { useContext, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import SectionProfile from '../components/SectionProfile';
import SectionJobs from '../components/SectionJobs';
import SectionStudies from '../components/SectionStudies';
import SectionCourses from '../components/SectionCourses';
import Loading from '../components/Loading';

import useRequest from '../hooks/useRequest';
import CvContext from '../contexts/cv';
import AuthContext from '../contexts/auth';
import { generateBlobURL } from '../utils/utils';

const styles = {
  root: {
    margin: '0 auto',
    padding: 50
  }
};

const CV = ({ classes, currentCv }) => {
  const [cvResponse, cvRequest] = useRequest(process.env.NODE_HOST);
  const [fileResponse, fileRequest] = useRequest(process.env.NODE_HOST);
  const [photo, setPhoto] = useState(null);
  const [auth] = useContext(AuthContext);
  const [updates, createUpdateRequest] = useRequest(process.env.NODE_HOST);

  const requestUpdatesCvModel = data => {
    createUpdateRequest(`/cvs/${currentCv}`, 'PATCH', {
      headers: {
        authorization: `Bearer ${auth.token}`
      },
      data
    });
  };

  const requestUpdatesUserModel = data => {
    createUpdateRequest(`/users`, 'PATCH', {
      headers: {
        authorization: `Bearer ${auth.token}`
      },
      data
    });
  };

  useEffect(() => {
    // let didCancel = false;
    // const cleanUp = () => (didCancel = true);
    cvRequest(`/cvs/${currentCv}`);

    // return cleanUp;
  }, []);

  useEffect(() => {
    let didCancel = false;
    const cleanUp = () => (didCancel = true);

    if (cvResponse.status === 'SUCCESS') {
      fileRequest(
        `users/${cvResponse.data.user}/photo`,
        'GET',
        {
          responseType: 'blob'
        },
        cleanUp
      );
    }
    return cleanUp;
  }, [cvResponse.status]);

  useEffect(() => {
    if (fileResponse.status === 'SUCCESS') {
      setPhoto(generateBlobURL(fileResponse.data));
    }
  }, [fileResponse.status]);

  return (
    <Container maxWidth="md">
      {cvResponse.status === 'SUCCESS' && (
        <Box bgcolor="#EEEEEE" className={classes.root}>
          <CvContext.Provider value={{ requestUpdatesCvModel, requestUpdatesUserModel }}>
            <SectionProfile profile={{ ...cvResponse.data.profile }} photo={photo} />
            <SectionJobs jobs={cvResponse.data.jobs} />
            <SectionStudies studies={cvResponse.data.studies} />
            <SectionCourses courses={cvResponse.data.courses} />
          </CvContext.Provider>
        </Box>
      )}

      {cvResponse.status === 'FETCHING' && <Loading />}

      {cvResponse.status === 'LOADING' && <div>Error!</div>}
    </Container>
  );
};

export default withStyles(styles)(CV);
