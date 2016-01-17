import React from 'react';
import ReactDOM from 'react-dom';

import Container from './container';
import IntlProvider from '../index';
import * as locales from './locales';

class App extends React.Component {
  render() {
    return <Container />;
  }
}

ReactDOM.render(
  <IntlProvider locales={locales} lang="en">
    <App/>
  </IntlProvider>
  , document.getElementById('app'));
