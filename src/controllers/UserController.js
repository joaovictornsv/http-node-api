const fs = require('fs').promises;
const UserRepository = require('../repositories/UserRepository')

class UserController {

  constructor(path) {
    this.file = path
    this.userRepository = new UserRepository(path)
  }
  
  
  async getData() {
    const users = this.userRepository.find();

    return users;
  }
  
  async addUser(user, append=true) {
       
    if (append) {
      await this.userRepository.append(user);
    }
    else {
      await this.userRepository.write(user);
    }
  }
  
  async getUserById(id) {
    const user = await this.userRepository.findByID(id)
    
    return user;
  }
  
  async overwriteData(data) {
    await this.userRepository.updateData();
  }
  
}
module.exports = UserController;