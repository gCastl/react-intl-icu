function flatten(messages, prefix = '') {
  return Object.keys(messages).reduce((message, key) => {
    const value = messages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      if (/\.default$/.test(prefixedKey)) {
        message[prefixedKey.split('.').slice(0, -1).join('.')] = value;
      }
      else {
        message[prefixedKey] = value;
      }
    }
    else {
      Object.assign(message, flatten(value, prefixedKey));
    }
    return message;
  }, {});
}

function path(messages) {
  const reg = '\{\=([.]{1,})([^}]+)\}';

  Object.keys(messages).map((key) => {
    if (RegExp(reg).test(messages[key])) {
      messages[key]
        .match(RegExp(reg, 'g'))
        .map((k) => {
          let sep = '';
          const [, points, finalKey] = k.match(RegExp(reg));

          if (finalKey.split('.').length > 1) {
            sep = '.';
          }

          messages[key] = messages[key].replace(RegExp(`${k}`, 'g'),
            `{=${key.split('.').slice(0, 0 - points.length).join('.')}${sep}${finalKey}}`
          );
        });
    }
  });
  return messages;
}

function extend(messages) {
  const keys = Object.keys(messages);
  const reg = '\{\=([^}]+)\}';
  let founded = false;

  keys.map((key) => {
    if (RegExp(reg).test(messages[key])) {
      messages[key]
        .match(RegExp(reg, 'g'))
        .map((k) => {
          const [, finalKey] = k.match(RegExp(reg));

          if (key.indexOf(finalKey) > -1) {
            messages[key] = messages[key].replace(RegExp(k, 'g'),
              messages[finalKey]
            );

            if (RegExp(reg).test(messages[key])) {
              founded = true;
            }
          }
          else {
            // TODO error
          }
        });
    }
  });

  return (founded) ? this.extend(messages) : messages;
}

export function nested(messages) {
  return extend(path(flatten(messages)));
}
