const validateType = require('./validateType');
const Exception = require('../middlewares/Exception')

function validateParam(param, type, field) {
  if (!param) {
    return null;
  }

  const searchParamRE = /^((?!((\/)|(\;))).)*$/g;

  if (param.match(searchParamRE)) {
    return validateType(param, type, field);
  } else {
    throw new Exception('Invalid params');
  }
}

module.exports = validateParam;
