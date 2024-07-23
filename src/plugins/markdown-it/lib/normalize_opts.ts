'use strict';

function quoteRE(str: any) {
  return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}

export default (options: any) => {
  var emojies = options.defs,
      shortcuts;

  // Filter emojies by whitelist, if needed
  if (options.enabled.length) {
    emojies = Object.keys(emojies).reduce(function (acc: any, key) {
      if (options.enabled.indexOf(key) >= 0) {
        acc[key] = emojies[key];
      }
      return acc;
    }, {});
  }

  // Flatten shortcuts to simple object: { alias: emoji_name }
  shortcuts = Object.keys(options.shortcuts).reduce(function (acc: any, key) {
    // Skip aliases for filtered emojies, to reduce regexp
    if (!emojies[key]) {
      return acc
    }

    if (Array.isArray(options.shortcuts[key])) {
      options.shortcuts[key].forEach(function (alias: any) {
        acc[alias] = key
      })

      return acc
    }

    acc[options.shortcuts[key]] = key

    return acc;
  }, {});

  var keys = Object.keys(emojies),
      names;

  // If no definitions are given, return empty regex to avoid replacements with 'undefined'.
  if (keys.length === 0) {
    names = '^$';
  } else {
    // Compile regexp
    names = keys
      .map(function (name) { return ':' + name + ':'; })
      .concat(Object.keys(shortcuts))
      .sort()
      .reverse()
      .map(function (name) { return quoteRE(name); })
      .join('|');
  }
  var scanRE = RegExp(names);
  var replaceRE = RegExp(names, 'g');

  return {
    defs: emojies,
    shortcuts: shortcuts,
    scanRE: scanRE,
    replaceRE: replaceRE
  }
}
