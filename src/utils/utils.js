import queryString from 'query-string';

export const generateBlobURL = file => URL.createObjectURL(new Blob([file]));

export const getBooleanFromUrlQuery = (search, key) =>
  queryString.parse(location.search)[key] === 'true' ? true : false;
