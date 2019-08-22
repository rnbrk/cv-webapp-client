import axios from 'axios';

const DOMAIN = `http://localhost:3000`;

const makeRequest = async (resource, method, data) =>
  await axios({
    url: DOMAIN + resource,
    method,
    data
  });

const login = async credentials => await makeRequest('/users/login', 'post', credentials);

const getCv = async id => await makeRequest(`/cvs/${id}`, 'get');

export { login, getCv };
