import React, { useContext } from 'react';
import authContext from '../contexts/auth';

const Authentication = () => {
  const { token, refreshToken, user } = useContext(authContext);

  if (user) {
    return (
      <div>
        <p>
          Logged in with as user {user.email} with id {user._id}.
        </p>
        <p>
          And your token is {token} and refreshToken is {refreshToken}
        </p>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Authentication;
