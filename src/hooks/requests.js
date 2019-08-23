import axios from 'axios';

const DOMAIN = `http://localhost:3000`;

const makeRequest = async (location, method, data) =>
  await axios({
    url: `${DOMAIN}${location}`,
    method,
    data
  });

const login = async credentials => await makeRequest('/users/login', 'post', credentials);

const getCv = async id => await makeRequest(`/cvs/${id}`, 'get');

const getPhoto = async id => {
  try {
    const response = await axios({
      url: `${DOMAIN}/users/${id}/photo`,
      method: 'get',
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    return url;
  } catch (e) {
    console.warn(`Photo of user ${id} could not be located. Using default image.`);
    return null;
  }
};

export { makeRequest, login, getCv, getPhoto };
