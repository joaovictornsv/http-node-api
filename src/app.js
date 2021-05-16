const http = require('http');
const _ = require('url');
const path = require('path');

const UserController = require('./controllers/UserController');
const Exception = require('./errors/Exception');
const MiddlewareException = require('./errors/MiddlewareException')


const filePath = path.resolve(__dirname, 'data', 'users.txt');

const userController = new UserController(filePath)
const middlewareException = new MiddlewareException()


const app = http.createServer(async (req, res) => {
  const url = new _.URL('http://localhost:3333'+req.url)

  try {
    const route = url.pathname
    if (route == '/') {
      
      res.writeHead(200, { 'content-type': 'application/json'})
      res.write(JSON.stringify({welcome: 'http node api'}))
      
      return res.end();
    }
    
    // GET
    else if(route == '/users') {
      const id = url.searchParams.get('id');

      if (id) {
        const userExists = await userController.getUserById(id);

        if (!userExists) {
          throw new Exception('User with this id does not exists');
        }

        res.writeHead(200, { 'content-type': 'application/json'});
        res.write(JSON.stringify(userExists));
        return res.end();
      }
      
      const users = await userController.getData();
      
      res.writeHead(200, { 'content-type': 'application/json'});
      res.write(JSON.stringify(users));
      return res.end();
      
    }
   
    // POST
    else if (route == '/add') {
      const id = url.searchParams.get('id');
      const name = url.searchParams.get('name');
      const age = url.searchParams.get('age');
      const city = url.searchParams.get('city');
      
      if (!id || !name || !age || !city) {
        throw new Exception('This params are incorret!');
      }
      
      
      const userAlreadyExists = await userController.getUserById(id);
      
      if (userAlreadyExists) {
        throw new Exception('An user with this id already exists');
      }

      const newUser = { id, name, age, city }
      
      await userController.addUser(newUser);
      
      res.writeHead(201, { 'content-type': 'application/json'});
      res.write(JSON.stringify(newUser));
      return res.end();
      
    }
    
    
    // PUT
    else if (route == '/edit') {
      const id = url.searchParams.get('id');
      const name = url.searchParams.get('name');
      const age = url.searchParams.get('age');
      const city = url.searchParams.get('city');
      
      if (!id) {
        throw new Exception('Id not provided!');
      }
      
      if (!name && !age && !city) {
        throw new Exception('No fields to edit provided!');
      }
      const users = await userController.getData();
      
      const userExists = users.find(user => {
        if (user.id == id) {
          return user;
        }
      })
      
      if (!userExists) {
        throw new Exception('User does not exist');
      }
      const changes = []
      
      name && changes.push(['name', name])
      age && changes.push(['age', age])
      city && changes.push(['city', city])
      
      const usersUpdated = users.map(user => {
        if (user.id == id) {
          changes.forEach(change => {
            user[change[0]] = change[1];
          })
        }
        
        return user;
      });
      
      await userController.overwriteData(usersUpdated);
      
      res.writeHead(200, { 'content-type': 'application/json'});
      res.write({message: 'Data updated'})
      return res.end();
    }
    
    
    // DELETE

    else if (route == '/delete') {
      const id = url.searchParams.get('id');

      if (!id) {
        throw new Exception('Id not provided!');
      }

      const users = await userController.getData();

      const userExists = users.find(user => {
        if (user.id == id) {
          return user;
        }
      })
      
      if (!userExists) {
        throw new Exception('User does not exist');
      }

      const usersUpdated = users.filter(user => {
        if (user.id != id) {
          return user;
        }
      });
      
      await userController.overwriteData(usersUpdated);

      res.writeHead(200, { 'content-type': 'application/json'});
      res.write(JSON.stringify({message: 'User deleted!'}));
      return res.end();
    }

    // 404
    else {
      throw new Exception('Resource not found')
    }
    
  } catch (err) {
    middlewareException.handle(err, res);
    return res.end();
  }
})

app.listen(3333, () => console.log('Server is listening on port 3333.'));