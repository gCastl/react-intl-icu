import { PropTypes } from 'react';

export function propsChecker(props, propTypes) {
  let valid = true;
  for (const prop in propTypes) {
    if (propTypes.hasOwnProperty(prop)) {
      const err = propTypes[prop](props, prop, 'name', 'prop');
      if (err) {
        console.error(err);
        valid = false;
      }
    }
  }
  return valid;
}

export function localeChecker(locale) {
  return propsChecker(locale, {
    locale: PropTypes.array.isRequired,
    messages: PropTypes.object
  });
}
