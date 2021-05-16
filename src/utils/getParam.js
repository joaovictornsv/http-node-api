const getRE = /\/(users)\/?([0-9])*?\/?$/g
const putRE = /^\/(users)\/([0-9])*\/data/g
const postRE = /^\/(users)\/(data)/g

function getParam(route) {
  const allParams = route.split('/');

  const param = allParams.length == 3 ? allParams[2] : null;

  return param;
}

module.exports = { getRE, postRE, putRE, getParam }

