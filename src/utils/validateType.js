const Exception = require('../middlewares/Exception')

function validateType(param, type, field) {
  if (type == 'number') {
    param = parseInt(param);
    
    if (typeof param == type && !isNaN(param)) {
      return param;
    }
  }

  if (type == 'email') {
    const emailRE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g

    if (param.match(emailRE)) {
      return param;
    }
  }

  if (type == 'string') {
    return param;
  }

  throw new Exception(`The field '${field}' must be of type '${type}'`);

}

module.exports = validateType;