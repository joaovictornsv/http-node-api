const UserRepository = require('../repositories/UserRepository')
const Exception = require('../middlewares/Exception');

class UserServices {

  constructor(path) {
    this.userRepository = new UserRepository(path)
  }

  async getAllUsers() {
    const users = await this.userRepository.find();

    return users
  }

  async getUser(id) {
    const userExists = await this.userRepository.findByID(id);

    if (!userExists) {
      throw new Exception('User with this id does not exists');
    }

    return userExists
  }

  async createUser(user) {
    if (!user.id || !user.name || !user.age || !user.city) {
      throw new Exception('This params are incorret!');
    }

    const userAlreadyExists = await this.userRepository.findByID(user.id);
    
    if (userAlreadyExists) {
      throw new Exception('An user with this id already exists');
    }

    await this.userRepository.append(user);

    return user
  }

  async modifyUser(user) {
    if (!user.id) {
      throw new Exception('Id not provided!');
    }
    
    if (!user.name && !user.age && !user.city) {
      throw new Exception('No fields to edit provided!');
    }

    const userExists = await this.userRepository.findByID(user.id);
    
    if (!userExists) {
      throw new Exception('User does not exist');
    }

    const changes = []
      
    user.name && changes.push(['name', user.name])
    user.age && changes.push(['age', user.age])
    user.city && changes.push(['city', user.city])
    
    const users = await this.userRepository.find();

    const usersUpdated = users.map(u => {
      if (u.id == user.id) {
        changes.forEach(change => {
          u[change[0]] = change[1];
        })
      }
      
      return u;
    });

    await this.userRepository.updateData(usersUpdated);
    return this.userRepository.findByID(user.id);
  }
  

  async removeUser(id) {
    if (!id) {
      throw new Exception('Id not provided!');
    }

    const userExists = await this.userRepository.findByID(id);

    if (!userExists) {
      throw new Exception('User does not exist');
    }

    const users = await this.userRepository.find();

    const usersUpdated = users.filter(user => {
      if (user.id != id) {
        return user;
      }
    });

    await this.userRepository.updateData(usersUpdated);

  }
}

module.exports = UserServices;