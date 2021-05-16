function validateParam(string) {
  const searchParamRE = /^((?!((\/)|(\;))).)*$/g

  if (string.match(searchParamRE)) {
    return string;
  }
  return null;
}

module.exports = validateParam;