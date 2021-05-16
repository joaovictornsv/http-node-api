const getRE = /\/(users)\/?([0-9a-z]|(\-))*?\/?$/g
const putRE = /^\/(users)\/([0-9a-z]|(\-))*\/(data((?!((\/)|(\?\/)))))/g
const postRE = /^\/(users)\/(data((?!((\/)|(\?\/)))))/g

function getParam(route) {
  const allParams = route.split('/');
  let param = null;
  if (allParams.length >= 3) {
    param = allParams[2]
    
    if (param == '') {
      param = null
    }
  }

  return param;
}

module.exports = { getRE, postRE, putRE, getParam }

