import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {main:'#337ab7'}
  },
});

const renderApp = () => (
  <MuiThemeProvider theme={theme}>
      <App />
  </MuiThemeProvider>
);

const rootElement = document.querySelector("#root");

if (rootElement) {
    ReactDOM.render(renderApp(), rootElement);
  }
