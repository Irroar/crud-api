import 'dotenv/config'
import { createServer } from 'http';
import { url } from 'inspector';
import { getAllUsers, getUserById, createUser } from './model/userController.js';
import { getReqData } from './utils/helpers.js';

const PORT = process.env.PORT || 5000;

export const app = () => {
  const server = createServer(async (req, res) => {

    if (req.url === '/api/user' && req.method === 'GET') {
      res.writeHead( 200, {
        'Content-Type': 'application/json',
      });
      const users = await getAllUsers();
      res.end(JSON.stringify(users));
    };

    if (req.url.match(/\/api\/user\/\w+/) && req.method === 'GET') {
      const id = req.url.split('/')[3];
      try {
        const user = await getUserById(id);
        res.writeHead( 200, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(user));
      } catch(err) {
        if (err.message === 'Invalid uuid') {
          res.writeHead(400, {
            'Content-Type': 'application/json',
          });
          res.end(JSON.stringify({ message: 'userId is not valid uuid' }));
        } else {
          res.end(JSON.stringify({ message: 'User not found' }));
        }
      }      
    };

    if (req.url === '/api/user' && req.method === 'POST') {
      const reqBody = await getReqData(req);
      try {
        const newUser = await createUser(JSON.parse(reqBody));
        res.writeHead(201, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(newUser));
      } catch(err) {
        res.writeHead(400, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ message: err.message }));
      }
    }


  });
  server.listen(PORT, () => {
    console.log(`Server starts listening port ${PORT}`);
  })
}