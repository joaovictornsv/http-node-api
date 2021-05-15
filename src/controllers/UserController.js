const fs = require('fs').promises;

class UserController {
  
  constructor(path) {
    this.file = path
  }
  
  
  async getData() {
    const file = await fs.readFile(this.file, 'utf8');
    const lines = file.split('\n');
    
    const data = lines.map(line => {
      const [ id, name, age, city ] = line.split(';');
      
      return { id, name, age, city};
    })
    
    return data;
  }
  
  async addUser(user, append=true) {
    
    const { id, name, age, city } = user;
    
    if (append) {
      await fs.writeFile(this.file, `\n${id};${name};${age};${city}`, { flag: 'a' });
    }
    else {
      await fs.writeFile(this.file, `${id};${name};${age};${city}`);
    }
  }
  
  async getUserById(id) {
    const users = await this.getData(this.file);
    
    const user = users.find(user => {
      if (user.id == id) {
        return user;
      }
    })
    
    return user;
  }
  
  async overwriteData(data) {
    (async () => {
      for (let i = 0; i < data.length; i++) {
        if (i == 0) {
          await this.addUser(data[i], this.file, false);
        } 
        else {
          await this.addUser(data[i], this.file);
        }
      }
    })()
  }
  
}
module.exports = UserController;