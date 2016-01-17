import React, { PropTypes, Component } from 'react';
import { IntlConnect } from '../index';

class Container extends Component {
  static propTypes = {
    formatIntl: PropTypes.func
  };

  render() {
    const { formatIntl } = this.props;

    return (
      <div>
        <ul>
          <li>{formatIntl('foo')}</li>
          <li>{formatIntl('test', { test: 'try' })}</li>
          <li>{formatIntl('foo.bar')}</li>
          <li></li>
          <li>{formatIntl('{n, number}')}</li>
        </ul>
      </div>
    );
  }
}

export default IntlConnect(Container);
