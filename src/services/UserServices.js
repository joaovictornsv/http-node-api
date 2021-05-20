const UserRepository = require('../repositories/UserRepository');
const Exception = require('../middlewares/Exception');
const { uid, authID } = require('../utils/idGenerator');

class UserServices {
  constructor(path) {
    this.userRepository = new UserRepository(path);
  }

  async getAllUsers() {
    let users;
    await this.userRepository.find()
      .then((result) => {
        users = result;
      })
      .catch((err) => {
        console.error(err);
        throw new Exception('Error reading database');
      })

    return users;
  }

  async getUser(id) {
    const userExists = await this.userRepository.findByID(id);

    if (!authID(id)) {
      throw new Exception("The 'id must be of type 'uid'");
    }

    if (!userExists) {
      throw new Exception('User with this id does not exists');
    }

    return userExists;
  }

  async createUser(user) {
    const {
      name, age, city, email,
    } = user;

    if (!name || !age || !city || !email) {
      throw new Exception('This params are incorret!');
    }

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Exception('An user with this email already exists');
    }

    user.id = uid();

    await this.userRepository.append(user);

    return user;
  }

  async modifyUser(user) {
    if (!user.id) {
      throw new Exception('Id not provided!');
    }

    if (!authID(user.id)) {
      throw new Exception("The 'id must be of type 'uid'");
    }

    if (!user.name && !user.age && !user.city && !user.email) {
      throw new Exception('No fields to edit provided!');
    }

    const userExists = await this.userRepository.findByID(user.id);

    if (!userExists) {
      throw new Exception('User with this id does not exist');
    }

    const changes = [];

    user.name && changes.push(['name', user.name]);
    user.email && changes.push(['email', user.email]);
    user.age && changes.push(['age', user.age]);
    user.city && changes.push(['city', user.city]);

    const users = await this.userRepository.find();

    const usersUpdated = users.map((u) => {
      if (u.id === user.id) {
        changes.forEach((change) => {
          const [key, value] = change;
          u[key] = value;
        });
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

    if (!authID(id)) {
      throw new Exception("The 'id must be of type 'uid'");
    }

    const userExists = await this.userRepository.findByID(id);

    if (!userExists) {
      throw new Exception('User does not exist');
    }

    const users = await this.userRepository.find();

    const usersUpdated = users.filter((user) => {
      if (user.id !== id) {
        return user;
      }
    });

    await this.userRepository.updateData(usersUpdated);
  }
}

module.exports = UserServices;
