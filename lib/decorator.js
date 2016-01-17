import React, { PropTypes, Component } from 'react';

export const IntlConnect = ComposedComponent => class extends Component {
  static contextTypes = {
    format: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired
  };

  render() {
    const composedProps = {
      formatIntl: this.context.format,
      formatDate: this.context.formatDate,
      formatTime: this.context.formatTime,
      formatNumber: this.context.formatNumber,
      formatRelative: this.context.formatRelative,
      formatPlural: this.context.formatPlural,
    };

    console.log(this.context.intl);

    return <ComposedComponent {...this.props} {...composedProps} />;
  }
};
