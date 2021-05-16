const fs = require('fs').promises;

class UserRepository {
  constructor(path) {
    this.file = path;
  }

  async find() {
    const file = await fs.readFile(this.file, 'utf8');
    const lines = file.split('\n').splice(1);
    if (!lines) {
      return [];
    }
    const data = lines.map((line) => {
      const [id, name, email, age, city] = line.split(';');

      return {
        id, name, email, age, city,
      };
    });

    return data;
  }

  async append(user) {
    const {
      id, name, email, age, city,
    } = user;

    await fs.writeFile(this.file, `\n${id};${name};${email};${age};${city}`, { flag: 'a' });
  }

  async write(user) {
    const {
      id, name, age, email, city,
    } = user;

    await fs.writeFile(this.file, `${id};${name};${email};${age};${city}`);
  }

  async findByID(id) {
    const users = await this.find();
    const user = users.find((u) => {
      if (u.id === id) {
        return u;
      }
    });

    return user;
  }

  async findByEmail(email) {
    const users = await this.find();
    const user = users.find((u) => {
      if (u.email === email) {
        return u;
      }
    });

    return user;
  }

  async updateData(data) {
    const overwrite = async () => {
      if (data.length === 0) {
        await fs.writeFile(this.file, 'uid;name;email;age;city');
      } else {
        for (let i = 0; i < data.length; i++) {
          if (i === 0) {
            await fs.writeFile(this.file, 'uid;name;email;age;city');
            await this.append(data[i]);
          } else {
            await this.append(data[i]);
          }
        }
      }
    };

    await overwrite();
  }
}

module.exports = UserRepository;
