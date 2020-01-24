import React from 'react';
import ReactDOM from 'react-dom';
 import theme from './shared/theme'
import './index.scss';
import { ThemeProvider } from 'styled-components'
import TabsComponent from './TabsComponent';


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <TabsComponent />
  </ThemeProvider>,
document.getElementById('root'));