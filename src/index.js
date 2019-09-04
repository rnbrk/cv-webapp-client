import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import 'typeface-roboto';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';

const appElem = document.querySelector('.root');

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <AppRouter />
  </MuiThemeProvider>,
  appElem
);
