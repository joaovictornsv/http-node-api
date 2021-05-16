const validateType = require('./validateType')

function validateParam(param, type, field) {
  if (!param) {
    return null;
  }

  const searchParamRE = /^((?!((\/)|(\;))).)*$/g

  if (param.match(searchParamRE)) {
    return validateType(param, type, field);
  }
  return null;
}

module.exports = validateParam;