const Exception = require('./Exception');

class MiddlewareException {

  handle(error, res) {
    if (error instanceof Exception) {
      res.writeHead(error.statusCode, error.contentType)
      res.write(error.message)
      
    }
    else {
      res.write(error)
    }
  }

  
}

module.exports = MiddlewareException;