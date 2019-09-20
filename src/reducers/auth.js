/**
 * Reduces the action into a request object to make an API request
 */
const requestReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        url: `${process.env.NODE_HOST}/users/login`,
        method: 'POST',
        data: { ...action.payload }
      };

    case 'LOGOUT':
      return {
        url: `${process.env.NODE_HOST}/users/logout`,
        method: 'POST',
        requiresToken: true
      };

    case 'LOGOUT_ALL':
      return {
        url: `${process.env.NODE_HOST}/users/logoutAll`,
        method: 'POST',
        requiresToken: true
      };

    case 'CREATE_USER':
      return {
        url: `${process.env.NODE_HOST}/users`,
        method: 'POST',
        data: { ...action.payload }
      };

    case 'DELETE USER':
      return {
        url: `${process.env.NODE_HOST}/users`,
        method: 'DELETE',
        requiresToken: true
      };

    case 'UPDATE PASSWORD':
      return {
        url: `${process.env.NODE_HOST}/users`,
        method: 'PATCH',
        data: { ...action.payload },
        requiresToken: true
      };

    default:
      return null;
  }
};

export default requestReducer;
