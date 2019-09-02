export const instance = jest.fn(req => {
  const userRequestsFile =
    /^(\/users\/)(.+)(\/photo$)/.test(req.url) && req.responseType === 'blob';

  if (userRequestsFile) {
    return Promise.resolve(new Blob());
  }
});

const axiosMock = {
  // Returns an instance() function
  create: jest.fn(({ baseURL, timeout }) => instance)
};

export default axiosMock;
