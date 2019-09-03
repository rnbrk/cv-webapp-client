import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AuthContext from '../contexts/auth';
import { login, logout, logoutAll, createUser, deleteUser, updatePassword } from '../actions/auth';
import { storeItem, removeItem, clearStorage, setNewKey } from '../hooks/useStorageHandler';

const TopBar = ({ storage }) => {
  const [auth, dispatch] = useContext(AuthContext);
  const [storedItem, dispatchToStorage] = storage;

  return (
    <div>
      <Box bgcolor="red">
        <Button
          variant="contained"
          onClick={() => dispatch(login({ email: 'ron@web.dev', password: '12345abc' }))}
        >
          Log in
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Log out
        </Button>

        <Button variant="contained" onClick={() => console.log(auth)}>
          Show auth
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            dispatch(createUser({ email: 'support@microsoft.com', password: 'b1llg4t3zZz' }));
          }}
        >
          Create new account
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            dispatch(deleteUser());
          }}
        >
          Delete account
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            dispatch(updatePassword({ firstName: 'Steve', lastName: 'Ballmer' }));
          }}
        >
          Update password
        </Button>
      </Box>

      <Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            console.log(storedItem);
          }}
        >
          Get item
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatchToStorage(storeItem({ name: 'myName', age: '99999' }));
          }}
        >
          Store item
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatchToStorage(removeItem());
          }}
        >
          Remove item
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatchToStorage(setNewKey('xyz23y65v398'));
          }}
        >
          Set key
        </Button>
      </Box>
    </div>
  );
};

export default TopBar;

/*
      <Box>
        <Button variant="contained" color="secondary" onClick={handleGetCvs}>
          Get CVs
        </Button>
      </Box>

      <Box>
        <Button
          variant="contained"
          onClick={() => {
            getPhoto(`/users/${auth._id}/photo`);
          }}
        >
          Get photo
        </Button>

        <Button
          variant="contained"
          onClick={async () => {
            const token = await auth.getToken();
            deletePhoto(`/users/photo`, token);
          }}
        >
          Delete photo
        </Button>
      </Box>
        */
