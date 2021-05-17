const Exception = require('../middlewares/Exception');

function validateType(param, type, field) {
  let Vparam = param;
  const Vtype = type;

  if (Vtype === 'number') {
    Vparam = parseInt(Vparam, 10);

    if (typeof Vparam === Vtype && !isNaN(Vparam)) {
      return Vparam;
    }
  }

  if (Vtype === 'email') {
    const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

    if (Vparam.match(emailRE)) {
      return Vparam;
    }
  }

  if (Vtype === 'string') {
    return Vparam;
  }

  throw new Exception(`The field '${field}' must be of type '${Vtype}'`);
}

module.exports = validateType;
