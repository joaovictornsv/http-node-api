function encrypt(number) {
  let numberEncrypt = number.toString().replace('0', 'o');
  numberEncrypt = numberEncrypt.replace('1', 'i');
  numberEncrypt = numberEncrypt.replace('3', 'e');
  numberEncrypt = numberEncrypt.replace('4', 'a');
  numberEncrypt = numberEncrypt.replace('5', 's');

  return numberEncrypt;
}

function authID(id) {
  const uidRE = /^(uid-j[0-9a-z*]*-v[0-9a-z*]*-j[0-9a-z*]*-v[0-9a-z*]*)$/g;

  if (id.toString().match(uidRE)) {
    return true;
  }
  return false;
}

function uid() {
  const date = new Date();

  const increment = date.getDay() + date.getMonth() + date.getFullYear();
  
  const UTCMilli = date.getUTCMilliseconds();

  const first = date.getMilliseconds() * (UTCMilli + 10) * (UTCMilli + 20) * (parseInt(Math.random() * 10) + 1) + increment;
  const second = (date.getSeconds()+1) * (date.getUTCSeconds()+1) * (UTCMilli + 30) * (parseInt(Math.random() * 10) + 2) + increment;
  const third = (date.getMinutes()+1) * (date.getUTCMinutes()+1) * (UTCMilli + 40) * (parseInt(Math.random() * 10) + 3) + increment;
  const fourth = (date.getHours()+1) * (date.getUTCHours()+1) * (UTCMilli + 50) * (parseInt(Math.random() * 10) + 4) + increment;

  const id = `uid-j${encrypt(first)}-v${encrypt(second)}-j${encrypt(third)}-v${encrypt(fourth)}`;

  return id;
}

module.exports = { uid, authID };
