const fs = require('fs').promises;

class UserRepository {
  constructor(path) {
    this.file = path
  }

  async find() {
    const file = await fs.readFile(this.file, 'utf8');
    const lines = file.split('\n');
    
    const data = lines.map(line => {
      const [ id, name, age, city ] = line.split(';');
      
      return { id, name, age, city};
    })

    return data;
  }

  async append(user) {
    const { id, name, age, city } = user;

    await fs.writeFile(this.file, `\n${id};${name};${age};${city}`, { flag: 'a' });
  }

  async write(user) {
    const { id, name, age, city } = user;
    
    await fs.writeFile(this.file, `${id};${name};${age};${city}`);
  }

  async findByID(id) {
    const users = await this.find();
    
    const user = users.find(user => {
      if (user.id == id) {
        return user;
      }
    })
    
    return user;
  }

  async updateData(data) {
    (async () => {
      for (let i = 0; i < data.length; i++) {
        if (i == 0) {
          await this.write(data[i]);
        } 
        else {
          await this.append(data[i]);
        }
      }
    })()
  }

}

module.exports = UserRepository;