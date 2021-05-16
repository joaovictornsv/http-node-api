function response(res, data={}, statusCode=200, contentType='application/json') {
  res.writeHead(statusCode, { 'content-type': contentType});
  res.write(JSON.stringify(data));

  return res.end();
}

module.exports = response