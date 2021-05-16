const UserServices = require('../services/UserServices')
const response = require('../utils/response')

class UserController {
  
  constructor(path) {
    this.path = path;
  }

  async index(res) {
  
    const userServices = new UserServices(this.path)

    const users = await userServices.getAllUsers();
    
    return response(res, users) 
  }

  async indexUser(res, id='') {
    const userServices = new UserServices(this.path)
  
    const user = await userServices.getUser(id);
    
    return response(res, user);
  }

  async addUser(res, user) {
    const userServices = new UserServices(this.path);

    const newUser = await userServices.createUser(user);

    return response(res, newUser, 201);
  }
  
  async updateUser(res, user) {
    const userServices = new UserServices(this.path)
    
    const newUser = await userServices.modifyUser(user);

    return response(res, newUser);
  }

  async deleteUser(res, id) {
    const userServices = new UserServices(this.path)
    
    await userServices.removeUser(id);

    return response(res, {message: `User with id ${id} deleted!`});
  }
}
module.exports = UserController;