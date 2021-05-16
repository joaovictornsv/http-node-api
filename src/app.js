const http = require('http');
const _ = require('url');
const path = require('path');

const UserController = require('./controllers/UserController');
const Exception = require('./errors/Exception');
const MiddlewareException = require('./errors/MiddlewareException');
const { getRE, postRE, putRE,  getParam } = require('./utils/getParam')
const validateParam = require('./utils/validateParam')


const filePath = path.resolve(__dirname, 'data', 'users.txt');

const userController = new UserController(filePath)
const middlewareException = new MiddlewareException()

const app = http.createServer(async (req, res) => {
  const url = new _.URL('http://localhost:3333'+req.url)
  const method = req.method;
  
  const route = url.pathname;

  try {
    if (route == '/') {
      
      res.writeHead(200, { 'content-type': 'application/json'})
      res.write(JSON.stringify({welcome: 'http node api'}))
      
      return res.end();
    }
    

    else if (method == 'GET' && route.match(getRE)) {
      const id = getParam(route);
      
      if (id) {
        return await userController.indexUser(res, id)
      }
      
      return await userController.index(res);
    }


    else if (method == 'POST' && route.match(postRE)) {
      const id = validateParam(url.searchParams.get('id'));
      const name = validateParam(url.searchParams.get('name'));
      const age = validateParam(url.searchParams.get('age'));
      const city = validateParam(url.searchParams.get('city'));
      
      const user = { id, name, age, city }
      
      return await userController.addUser(res, user);
    }


    else if (method == 'PUT' && route.match(putRE)) {
      const id = getParam(route);
      const name = validateParam(url.searchParams.get('name'));
      const age = validateParam(url.searchParams.get('age'));
      const city = validateParam(url.searchParams.get('city'));
      
      const user = { id, name, age, city }      
      
      return await userController.updateUser(res, user)
    }


    else if (method == 'DELETE' && route.match(getRE)) {
      const id = getParam(route);
      
      return await userController.deleteUser(res, id); 
    }
    
    // 404
    else {
      throw new Exception('Resource not found')
    }
    
  }
  catch (err) {
    middlewareException.handle(res, err);
    return res.end();
  }
})

app.listen(3333, () => console.log('Server is listening on port 3333.'));