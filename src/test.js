// import authContext from './contexts/auth';
// import Authentication from './components/Authentication';
// import { login, getCv } from './hooks/requests';

// const [credentials, setCredentials] = useState({
//   email: 'ron@web.dev',
//   password: '12345abc'
// });
// const [refreshToken, setRefreshToken] = useState(null);
// const [token, setToken] = useState(null);
// const [user, setUser] = useState(null);
// const [cvs, setCvs] = useState(null);
// const [currentCv, setCurrentCv] = useState(null);

// useEffect(() => {
//   const handleLogin = async () => {
//     try {
//       const response = await login(credentials);
//       setRefreshToken(response.data.refreshToken);
//       setToken(response.data.token);
//       setUser(response.data.user);
//       setCvs(response.data.user.cvs);

//       console.log(response.data);
//     } catch (e) {
//       console.error('Error', e);
//     }
//   };
//   handleLogin();
// }, []);

// useEffect(() => {
//   const handleGetCvs = async () => {
//     try {
//       const response = await getCv(cvs[0]._id);
//       setCurrentCv(response.data);
//     } catch (e) {
//       console.error('Error', e);
//     }
//   };

//   if (cvs) {
//     handleGetCvs();
//   }
// }, [cvs]);

// <authContext.Provider value={{ token, refreshToken, user }}>
// </authContext.Provider>
