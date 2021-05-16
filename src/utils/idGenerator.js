function encrypt(number) {
  let numberEncrypt = number.toString().split(0).join('o');
  numberEncrypt = numberEncrypt.split(1).join('i');
  numberEncrypt = numberEncrypt.split(3).join('e');
  numberEncrypt = numberEncrypt.split(4).join('a');
  numberEncrypt = numberEncrypt.split(5).join('s');

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

  const first = date.getMilliseconds() * date.getUTCMilliseconds() * date.getUTCMilliseconds();
  const second = date.getSeconds() * date.getUTCSeconds() * date.getUTCMilliseconds();
  const third = date.getMinutes() * date.getUTCMinutes() * date.getUTCMilliseconds();
  const fourth = date.getHours() * date.getUTCHours() * date.getUTCMilliseconds();

  const id = `uid-j${encrypt(first)}-v${encrypt(second)}-j${encrypt(third)}-v${encrypt(fourth)}`;

  return id;
}

module.exports = { uid, authID };
