const Exception = require('./Exception');

class MiddlewareException {
  handle(res, error) {
    if (error instanceof Exception) {
      res.writeHead(error.statusCode, error.contentType);
      res.write(error.message);
    } else {
      console.log(error);
      res.write(error);
    }
  }
}

module.exports = MiddlewareException;
