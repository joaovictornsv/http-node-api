const http = require('http');
const _ = require('url');
const path = require('path');
const { getData, addUser, getUserById, overwriteData } = require('./utils');

const filePath = path.resolve(__dirname, 'data', 'users.txt');

module.exports = http.createServer(async (req, res) => {
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
        const userExists = await getUserById(id, filePath);

        if (!userExists) {
          res.writeHead(400, { 'content-type': 'application/json'});
          res.write(JSON.stringify({error: 'User with this id does not exists'}));
          return res.end();
        }

        res.writeHead(200, { 'content-type': 'application/json'});
        res.write(JSON.stringify(userExists));
        return res.end();
      }
      
      const users = await getData(filePath);
      
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
        res.writeHead(400, { 'content-type': 'application/json'});
        res.write(JSON.stringify({error: 'This params are incorret!'}));
        return res.end();
      }
      
      
      const userAlreadyExists = await getUserById(id, filePath);
      
      if (userAlreadyExists) {
        res.writeHead(400, { 'content-type': 'application/json'});
        res.write(JSON.stringify({error: 'An user with this id already exists'}));
        return res.end();
      }
      const newUser = { id, name, age, city }
      
      await addUser(newUser, filePath);
      
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
        res.writeHead(400, { 'content-type': 'application/json'});
        res.write(JSON.stringify({error: 'Id not provided!'}));
        return res.end();
      }
      
      if (!name && !age && !city) {
        res.writeHead(400, { 'content-type': 'application/json'});
        res.write(JSON.stringify({error: 'No fields to edit provided!'}));
        return res.end();
      }
      const users = await getData(filePath);
      
      const userExists = users.find(user => {
        if (user.id == id) {
          return user;
        }
      })
      
      if (!userExists) {
        res.writeHead(400, { 'content-type': 'application/json'});
        throw JSON.stringify({error: 'User does not exist'});
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
      
      await overwriteData(filePath, usersUpdated);
      
      res.writeHead(200, { 'content-type': 'application/json'});
      throw JSON.stringify({message: 'Data updated'});
    }
    
    
    // DELETE

    else if (route == '/delete') {
      const id = url.searchParams.get('id');

      if (!id) {
        res.writeHead(400, { 'content-type': 'application/json'});
        throw JSON.stringify({error: 'Id not provided!'});
      }

      const users = await getData(filePath);

      const userExists = users.find(user => {
        if (user.id == id) {
          return user;
        }
      })
      
      if (!userExists) {
        res.writeHead(400, { 'content-type': 'application/json'});
        throw JSON.stringify({error: 'User does not exist'});
      }

      const usersUpdated = users.filter(user => {
        if (user.id != id) {
          return user;
        }
      });
      
      await overwriteData(filePath, usersUpdated);

      res.writeHead(200, { 'content-type': 'application/json'});
      res.write(JSON.stringify({message: 'User deleted!'}));
      return res.end();
    }

    // 404
    else {
      res.writeHead(404, { 'content-type': 'application/json'});
      res.write(JSON.stringify({error: 'resource not found'}));
      return res.end();
    }
    
  } catch (e) {
    res.write(e)
    return res.end();
  }
})