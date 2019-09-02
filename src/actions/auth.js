const login = credentials => ({ type: 'LOGIN', payload: { ...credentials } });

const logout = () => ({ type: 'LOGOUT' });

const logoutAll = () => ({ type: 'LOGOUT_ALL' });

const createUser = credentials => ({ type: 'CREATE_USER', payload: { ...credentials } });

const deleteUser = () => ({ type: 'DELETE USER' });

const updatePassword = updates => ({ type: 'UPDATE PASSWORD', payload: { ...updates } });

export { login, logout, logoutAll, createUser, deleteUser, updatePassword };
