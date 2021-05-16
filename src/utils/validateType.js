const Exception = require('../middlewares/Exception')

function validateType(param, type, field) {
  if (type == 'number') {
    param = parseInt(param)
  }

  if(typeof param != type || isNaN(param)) {
    throw new Exception(`The field '${field}' must be of type '${type}'`);
  }

  return param;
}

module.exports = validateType;