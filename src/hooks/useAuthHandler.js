import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import requestReducer from '../reducers/auth';

const initialRequest = {
  url: undefined,
  method: undefined,
  data: {},
  headers: {},
  timeout: 5000
};

const initialAuth = {
  _id: '',
  token: null,
  status: null
};

var dd = {
  content: [
    /**
     * User profile
     */
    {
      alignment: 'justify',
      margin: [0, 0, 0, 20],
      columns: [
        [
          {
            margin: [0, 0, 0, 10],
            stack: [
              { text: 'Ron Broek', style: 'mainTitle', alignment: 'left' },
              { text: 'Webdeveloper', style: 'sectionTitle', alignment: 'left' }
            ]
          },

          { text: 'ron@web.dev', alignment: 'left' },
          { text: '06 1111 222x', alignment: 'left' },
          { text: 'www.ronbroek.com', alignment: 'left' }
        ],
        {
          image: 'sampleImage.jpg',
          width: 150,
          height: 150,
          alignment: 'right'
        }
      ]
    },

    /**
     * About me
     */
    {
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [
          [{ text: 'About me', style: ['tableHeader', 'sectionTitle'], margin: [0, 10, 0, 0] }],
          [
            {
              text:
                "By default paragraphs are stacked one on top of (or actually - below) another.\nIt's possible however to split any paragraph (or even the whole document) into columns.\nHere we go with 2 star-sized columns, with justified text and gap set to 20:",
              alignment: 'left',
              margin: [0, 3, 0, 10]
            }
          ]
        ]
      },
      layout: 'headerLineOnly'
    },

    /**
     * Job experience
     */

    {
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [
          [{ text: 'Experience', style: ['tableHeader', 'sectionTitle'], margin: [0, 10, 0, 0] }],
          [
            {
              margin: [0, 15, 0, 15],
              stack: [
                // Job title
                {
                  margin: [0, 0, 0, 10],
                  columns: [
                    [
                      { text: 'Logistiek medewerker', style: ['itemTitle'], alignment: 'left' },
                      { text: 'Bol.com', style: ['itemSubtitle'], alignment: 'left' }
                    ],
                    [{ text: 'November 2016 - januari 2019', alignment: 'right' }]
                  ]
                },
                // Job description
                {
                  text:
                    "By default paragraphs are stacked one on top of (or actually - below) another.\nIt's possible however to split any paragraph (or even the whole document) into columns.\nHere we go with 2 star-sized columns, with justified text and gap set to 20:",
                  alignment: 'left',
                  margin: [0, 3, 0, 10]
                },
                // Job responsibilities
                {
                  ul: [
                    'Aanspreekpunt voor al je vragen',
                    'Rapporteren van issues in de keten d.m.v. analyses',
                    'Stakeholder in logistieke IT-projecten'
                  ]
                }
              ]
            }
          ],

          [
            {
              margin: [0, 15, 0, 15],
              stack: [
                // Job title
                {
                  margin: [0, 0, 0, 10],
                  columns: [
                    [
                      { text: 'Redacteur ondertiteling', style: ['itemTitle'], alignment: 'left' },
                      { text: 'NPO', style: ['itemSubtitle'], alignment: 'left' }
                    ],
                    [{ text: 'September 2012 - augustus 2016', alignment: 'right' }]
                  ]
                },
                // Job description
                {
                  text:
                    "By default paragraphs are stacked one on top of (or actually - below) another.\nIt's possible however to split any paragraph (or even the whole document) into columns.\nHere we go with 2 star-sized columns, with justified text and gap set to 20:",
                  alignment: 'left',
                  margin: [0, 3, 0, 10]
                },
                // Job responsibilities
                {
                  ul: [
                    `Tv-programma's live ondertitelen`,
                    'Voorbereiden van ondertiteling',
                    'Onderhoud achterliggende systemen'
                  ]
                }
              ]
            }
          ]
        ]
      },
      layout: 'lightHorizontalLines'
    },

    /**
     * Education
     */

    {
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [
          [{ text: 'Education', style: ['tableHeader', 'sectionTitle'], margin: [0, 10, 0, 0] }],
          [
            {
              margin: [0, 15, 0, 15],
              stack: [
                {
                  columns: [
                    [
                      { text: 'Master American Studies', style: ['itemTitle'], alignment: 'left' },
                      {
                        text: 'Universiteit van Amsterdam',
                        style: ['itemSubtitle'],
                        alignment: 'left'
                      }
                    ],
                    [{ text: '2009 - 2011', alignment: 'right' }]
                  ]
                }
              ]
            }
          ],

          [
            {
              margin: [0, 15, 0, 15],
              stack: [
                {
                  columns: [
                    [
                      { text: 'Bachelor Mediastudies', style: ['itemTitle'], alignment: 'left' },
                      {
                        text: 'Universiteit van Amsterdam',
                        style: ['itemSubtitle'],
                        alignment: 'left'
                      }
                    ],
                    [{ text: '2004 - 2008', alignment: 'right' }]
                  ]
                }
              ]
            }
          ],

          [
            {
              margin: [0, 15, 0, 15],
              stack: [
                {
                  columns: [
                    [
                      { text: 'Interaction design', style: ['itemTitle'], alignment: 'left' },
                      {
                        text: 'Universiteit van Amsterdam',
                        style: ['itemSubtitle'],
                        alignment: 'left'
                      }
                    ],
                    [{ text: '2007', alignment: 'right' }]
                  ]
                }
              ]
            }
          ],

          [
            {
              margin: [0, 15, 0, 15],
              stack: [
                {
                  columns: [
                    [
                      {
                        text: 'Recht & Economie in Europa',
                        style: ['itemTitle'],
                        alignment: 'left'
                      },
                      {
                        text: 'Universiteit van Amsterdam',
                        style: ['itemSubtitle'],
                        alignment: 'left'
                      }
                    ],
                    [{ text: '2009', alignment: 'right' }]
                  ]
                }
              ]
            }
          ]
        ]
      },
      layout: 'headerLineOnly'
    },

    /**
     * Courses / certifications
     */

    {
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [
          [{ text: 'Courses', style: ['tableHeader', 'sectionTitle'], margin: [0, 10, 0, 0] }],
          [
            {
              margin: [0, 15, 0, 15],
              stack: [
                {
                  columns: [
                    [
                      {
                        text: 'The Complete React Developer Course',
                        style: ['itemTitle'],
                        alignment: 'left'
                      },
                      {
                        text: 'Andrew Mead / Udemy',
                        style: ['itemSubtitle'],
                        alignment: 'left'
                      }
                    ]
                  ]
                }
              ]
            }
          ],

          [
            {
              margin: [0, 15, 0, 15],
              stack: [
                {
                  columns: [
                    [
                      {
                        text: 'The Complete Node Developer Course',
                        style: ['itemTitle'],
                        alignment: 'left'
                      },
                      {
                        text: 'Universiteit van Amsterdam',
                        style: ['itemSubtitle'],
                        alignment: 'left'
                      }
                    ]
                  ]
                }
              ]
            }
          ],

          [
            {
              margin: [0, 15, 0, 15],
              stack: [
                {
                  columns: [
                    [
                      { text: `You Don't Know JS`, style: ['itemTitle'], alignment: 'left' },
                      {
                        text: 'Kyle Simpson',
                        style: ['itemSubtitle'],
                        alignment: 'left'
                      }
                    ]
                  ]
                }
              ]
            }
          ],

          [
            {
              margin: [0, 15, 0, 15],
              stack: [
                {
                  columns: [
                    [
                      { text: 'Clean Code', style: ['itemTitle'], alignment: 'left' },
                      {
                        text: 'Robert C. Martin',
                        style: ['itemSubtitle'],
                        alignment: 'left'
                      }
                    ]
                  ]
                }
              ]
            }
          ]
        ]
      },
      layout: 'headerLineOnly'
    }
  ],
  styles: {
    mainTitle: {
      fontSize: 20,
      bold: true
    },
    sectionTitle: {
      fontSize: 16,
      color: 'blue',
      alignment: 'center'
    },
    itemTitle: {
      fontSize: 14,
      bold: true,
      alignment: 'left'
    },
    itemSubtitle: {
      fontSize: 14,
      alignment: 'left'
    }
  },
  defaultStyle: {
    columnGap: 20
  }
};

function useAuthHandler() {
  const [action, dispatch] = useReducer(requestReducer, initialRequest);
  const [auth, setAuth] = useState(initialAuth);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    console.log('auth', auth);
  }, [auth]);

  /**
   * Get auth data from localStorage and use refreshToken
   */
  useEffect(() => {
    if (localStorage.userData) {
      const userDataFromStorage = JSON.parse(localStorage.getItem('userData'));
      if (_isValid(userDataFromStorage.refreshToken)) {
        setAuth({ ...userDataFromStorage.authData, status: 'FETCHING' });
        _getTokenOnStartUp(userDataFromStorage.authData.email, userDataFromStorage.refreshToken);
      }
    }
  }, []);

  /**
   * Do a fetch request if an action is dispatched by the user
   */
  useEffect(() => {
    if (action.url !== undefined) {
      _makeRequest(action);
    }
  }, [action]);

  async function _getTokenOnStartUp(email, refreshToken) {
    const req = {
      url: `${process.env.NODE_HOST}/users/token`,
      method: 'POST',
      headers: { Authorization: `Bearer ${refreshToken}` },
      data: { email: email }
    };
    const res = await axios(req);
    setAuth(auth => ({ ...auth, token: res.data.token, status: 'SUCCESS' }));
    setRefreshToken(res.data.refreshToken);
  }

  async function _makeRequest(action) {
    if (action === null) return;

    const req = { ...action };
    if (req.requiresToken) {
      req.headers = await _setHeaderIfAuthorized();
      delete req.requiresToken;
    }

    setAuth({ ...initialAuth, status: 'FETCHING' });
    try {
      console.log('authRequest', req);
      const res = await axios(req);
      console.log('authResponse', res);
      // LOG OUT
      const loggingOut = !res.data.user || !res.data.user._id;
      if (loggingOut) {
        setAuth(initialAuth);
        localStorage.removeItem('userData');
      }

      // LOG IN OR UPDATING DATA
      if (!loggingOut) {
        if (res.data.refreshToken) {
          setRefreshToken(res.data.refreshToken);

          const authData = _getAuthDataFromResponse(res);
          setAuth({ ...authData, status: 'SUCCESS' });

          const authDataToStorage = { ...authData };
          delete authDataToStorage.token;

          localStorage.setItem(
            'userData',
            JSON.stringify({
              authData: authDataToStorage,
              refreshToken: res.data.refreshToken
            })
          );
        }
      }
    } catch (e) {
      setAuth({ ...initialAuth, status: 'FAILURE' });
    }
  }

  function _getAuthDataFromResponse(res) {
    return {
      email: res.data.user.email,
      _id: res.data.user._id,
      cvs: res.data.user.cvs,
      token: res.data.token ? res.data.token : auth.token
    };
  }

  async function _setHeaderIfAuthorized() {
    try {
      const token = await _getToken();
      if (!token) throw new Error();
      return { Authorization: `Bearer ${token}` };
    } catch (e) {
      setAuth({ ...initialAuth, status: 'FAILURE' });
    }
  }

  async function _getToken() {
    if (_isValid(auth.token)) {
      return auth.token;
    }

    if (!_isValid(auth.token) && _isValid(refreshToken)) {
      try {
        const res = await _refreshAccessToken();
        setAuth({ ...auth, token: res.token });
        setRefreshToken(res.refreshToken);
        return res.token;
      } catch (e) {
        return null;
      }
    }

    // !_isValid(refreshToken)
    setAuth(initialAuth);
    return null;
  }

  /**
   * Decodes the payload of a JSON web token, then compares timestamp without now
   * @param {string} token - JSON web token
   * @param {string} prop - Name of object property with expiration time
   * @returns {boolean} - Whether token is still valid
   */
  function _isValid(token, prop = 'exp') {
    if (!token || typeof token !== 'string') return false;

    const [header, payload] = token.split('.');
    if (!payload) return false;

    const decoded = window.atob(payload);
    const parsed = JSON.parse(decoded);
    const expirationTime = moment.unix(parsed[prop]).utc();

    if (!expirationTime.isValid()) return false;
    return expirationTime.isAfter(moment().utc());
  }

  async function _refreshAccessToken() {
    try {
      const req = {
        url: `${process.env.NODE_HOST}/users/token`,
        method: 'POST',
        headers: { Authorization: `Bearer ${refreshToken}` },
        data: { email: auth.email }
      };
      const res = await axios(req);
      return res.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  return [auth, dispatch];
}

export default useAuthHandler;
