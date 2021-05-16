const fs = require('fs').promises;

async function getData(path) {
  const file = await fs.readFile(path, 'utf8');
  const lines = file.split('\n');

  const data = lines.map((line) => {
    const [id, name, age, city] = line.split(';');

    return {
      id, name, age, city,
    };
  });

  return data;
}

async function addUser(user, path, append = true) {
  const {
    id, name, age, city,
  } = user;

  if (append) {
    await fs.writeFile(path, `\n${id};${name};${age};${city}`, { flag: 'a' });
  } else {
    await fs.writeFile(path, `${id};${name};${age};${city}`);
  }
}

async function getUserById(id, path) {
  const users = await getData(path);

  const user = users.find((u) => {
    if (u.id === id) {
      return u;
    }
  });

  return user;
}

async function overwriteData(path, data) {
  (async () => {
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        await addUser(data[i], path, false);
      } else {
        await addUser(data[i], path);
      }
    }
  })();
}

module.exports = {
  getData, addUser, getUserById, overwriteData,
};
