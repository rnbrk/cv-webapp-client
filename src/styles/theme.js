import { createMuiTheme } from '@material-ui/core/styles';

const htmlElem = document.querySelector('html');
htmlElem.style.backgroundColor = '#2196F3';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2196F3' },
    secondary: { main: '#FF9900' },
    error: { main: '#FF6666' },
    text: { primary: '#444444' },
    background: {
      paper: '#fcfcfc',
      default: '#ffffff'
    }
  },

  typography: {
    h1: { fontWeight: 800, fontSize: '2.2rem' },
    subtitle1: { fontWeight: 100, fontSize: '1.6rem' },
    h2: { fontWeight: 600, fontSize: '1.6rem' },
    h3: { fontWeight: 800, fontSize: '1.2rem' },
    subtitle2: { fontWeight: 100, fontSize: '1.2rem' },
    body1: { fontWeight: 300, fontSize: '1rem' },
    body2: { fontWeight: 300, fontSize: '0.85rem' },

    fontSize: 12,
    htmlFontSize: 16,
    fontWeightBold: 700,
    fontWeightLight: 100,
    fontWeightMedium: 500,
    fontWeightRegular: 300
  },
  spacing: factor => [0, 4, 8, 16, 32, 64][factor]
});

export default theme;
