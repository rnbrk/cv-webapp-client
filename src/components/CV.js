import React, { useContext, useEffect, useState } from 'react';
import history from '../routers/history';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import SectionProfile from '../components/SectionProfile';
import SectionJobs from '../components/SectionJobs';
import SectionStudies from '../components/SectionStudies';
import SectionCourses from '../components/SectionCourses';
import Loading from '../components/Loading';

import useRequest from '../hooks/useRequest';
import CurrentCvContext from '../contexts/currentCv';
import EditModeContext from '../contexts/editMode';
import CvsContext from '../contexts/cvs';
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
  const [response, makeRequest] = useRequest(process.env.NODE_HOST);
  const [editMode] = useContext(EditModeContext);
  const [cvs, setCvs] = useContext(CvsContext);

  const deleteCv = async () => {
    const newListOfCvs = cvs.filter(cv => cv._id !== currentCv);
    const nextCvId = newListOfCvs[0]._id;

    await makeRequest(`/cvs/${currentCv}`, 'DELETE', {
      headers: {
        authorization: `Bearer ${auth.token}`
      }
    });

    setCvs(newListOfCvs);
    history.push(`/cvs/${nextCvId}?edit=true`);
  };

  const requestUpdatesCvModel = data => {
    makeRequest(`/cvs/${currentCv}`, 'PATCH', {
      headers: {
        authorization: `Bearer ${auth.token}`
      },
      data
    });
  };

  const requestUpdatesUserModel = data => {
    makeRequest(`/users`, 'PATCH', {
      headers: {
        authorization: `Bearer ${auth.token}`
      },
      data
    });
  };

  useEffect(() => {
    cvRequest(`/cvs/${currentCv}`);
  }, [currentCv]);

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
          <CurrentCvContext.Provider
            value={{ requestUpdatesCvModel, requestUpdatesUserModel, currentCv }}
          >
            <SectionProfile profile={{ ...cvResponse.data.profile }} photo={photo} />
            <SectionJobs jobs={cvResponse.data.jobs} />
            <SectionStudies studies={cvResponse.data.studies} />
            <SectionCourses courses={cvResponse.data.courses} />
          </CurrentCvContext.Provider>

          {editMode ? (
            <Grid justify="center" container>
              <Button
                variant="contained"
                color="secondary"
                aria-label="Delete resume"
                onClick={deleteCv}
              >
                Delete this resume
              </Button>
            </Grid>
          ) : null}
        </Box>
      )}

      {cvResponse.status === 'FETCHING' && <Loading />}

      {cvResponse.status === 'LOADING' && <div>Error!</div>}
    </Container>
  );
};

export default withStyles(styles)(CV);
