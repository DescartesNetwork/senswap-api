const { Types } = require('mongoose');

/**
 * Constructor
 */
const Utils = {}

Utils.parseJSON = function (jsonString) {
  if (!jsonString) return null;
  if (typeof jsonString != 'string') return null;
  try {
    return JSON.parse(jsonString);
  } catch (er) {
    return null;
  }
}

Utils.deepParseJSON = function (jsonString) {
  let value = Utils.parseJSON(jsonString);
  if (value == null) {
    if (Types.ObjectId.isValid(jsonString)) {
      return Types.ObjectId(jsonString);
    }
    return jsonString;
  }
  if (typeof value == 'array') {
    return value.map(e => Utils.deepParseJSON(e));
  }
  else if (typeof value == 'object') {
    let keys = Object.keys(value);
    keys.forEach(key => {
      value[key] = Utils.deepParseJSON(value[key]);
    });
    return value;
  }
  else return value;
}

module.exports = Utils;