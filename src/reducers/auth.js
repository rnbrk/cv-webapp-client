const DOMAIN = 'http://localhost:3000';

/**
 * Reduces the action into a request object to make an API request
 */
const requestReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'LOGIN':
      return {
        url: `${DOMAIN}/users/login`,
        method: 'POST',
        data: { ...action.payload }
      };

    case 'LOGOUT':
      return {
        url: `${DOMAIN}/users/logout`,
        method: 'POST',
        requiresToken: true
      };

    case 'LOGOUT_ALL':
      return {
        url: `${DOMAIN}/users/logoutAll`,
        method: 'POST',
        requiresToken: true
      };

    case 'CREATE_USER':
      return {
        url: `${DOMAIN}/users`,
        method: 'POST',
        data: { ...action.payload }
      };

    case 'DELETE USER':
      return {
        url: `${DOMAIN}/users`,
        method: 'DELETE',
        requiresToken: true
      };

    case 'UPDATE PASSWORD':
      return {
        url: `${DOMAIN}/users`,
        method: 'PATCH',
        data: { ...action.payload },
        requiresToken: true
      };

    default:
      return null;
  }
};

export default requestReducer;
