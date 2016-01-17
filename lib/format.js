import React, { PropTypes } from 'react';

const ID_REGEX = '^([\\w.]+)$';
const ICU_REGEX = '{([^}]+),(.*?)}';
const VAR_REGEX = '\{([a-zA-Z_$][0-9a-zA-Z_$]+)\}';

// '\{(.*?)\\,\\s?([a-z]+)(\\,\\s?(.*))?\\}'

function getVarName(variable) {
  return variable.substring(0, variable.length - 1).substring(1);
}

function variablesFormat(value, variables) {
  let finalValue = value;
  if (RegExp(VAR_REGEX, 'g').test(value)) {
    value.match(RegExp(VAR_REGEX, 'g')).map(val => {
      const name = getVarName(val);
      if (typeof variables[name] !== 'undefined') {
        finalValue = finalValue.replace(val, variables[name]);
      }

      // TODO error
      console.log('ERROR VAR MISSING');
    });
  }

  return finalValue;
}

function defaultFormat(value) {
  return value;
}

export function idFormat(id, variables = {}, messages = {}) {
  if (typeof messages[id] !== 'undefined') {
    return variablesFormat(messages[id], variables);
  }

  // TODO error
  console.log('ERROR ID UNDEFINED');
}

export function icuFormat(icu, variables = {}) {
  // let finalIcu = icu.substring(0, icu.length - 1).substring(1);
  // TODO detect icu format
}

export function detectFormat(value) {
  if (RegExp(ID_REGEX).test(value)) {
    return idFormat;
  }
  else if (RegExp(ICU_REGEX, 'gm').test(value)) {
    return icuFormat;
  }

  return defaultFormat;
}
