import React, { PropTypes, Component } from 'react';
import { IntlProvider as IProvider, addLocaleData } from 'react-intl';

import { localeChecker } from './lib/validate';
import { IntlTypes } from './lib/props';
import { nested } from './lib/nested';
import { detectFormat } from './lib/format';

export default class IntlProvider extends Component {
  static propTypes = {
    children: IntlTypes.children,
    locales: PropTypes.object,
    fallback: PropTypes.string,
    lang: PropTypes.string
  };

  static childContextTypes = {
    format: PropTypes.func
  };

  constructor(props) {
    super();
    const intl = {};
    const { locales, fallback } = props;
    let { lang } = props;

    this.messages = {};

    Object.keys(locales).filter(key => {
      return (locales.hasOwnProperty(key) && localeChecker(locales[key]));
    }).map(key => {
      this.messages[key] = nested(locales[key].messages);
      addLocaleData(locales[key].locale);
      intl[key] = locales[key];
    });

    if (typeof intl[lang] === 'undefined') {
      lang = fallback;
    }

    this.state = {
      intl,
      locale: lang,
      messages: this.messages[lang]
    };
  }

  getChildContext() {
    return {
      format: (value, variables) => {
        return detectFormat(value)(value, variables, this.state.messages);
      }
    };
  }

  render() {
    const { children } = this.props;
    const { locale, messages } = this.state;

    return (
      <IProvider
        {...this.props}
        locale={locale}
        messages={messages} >
        {children}
      </IProvider>
    );
  }
}

export { IntlConnect } from './lib/decorator';
