class Exception {
  constructor(message, statusCode=400, contentType='application/json') {
    this.statusCode = statusCode;
    this.contentType = { 'content-type': contentType};
    this.message = JSON.stringify({error: message});
  }
}

module.exports = Exception;