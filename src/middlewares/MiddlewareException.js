const Exception = require('./Exception');

class MiddlewareException {
  handle(res, error) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
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
