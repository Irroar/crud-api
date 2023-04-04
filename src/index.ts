import 'dotenv/config';
import * as http from 'http';
import process from 'process';
import {DataBase} from './database';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from './controllers/productController';
export const server = http.createServer((req, res) => {
    try {
        console.log(`Worker ${process.pid} requested`);
        const the_url = req.url;
        if ((req.url === '/api/users'  && req.method === 'GET') || (req.url === '/api/users/'  && req.method === 'GET')) {
            getProducts(req, res);
        } else if (the_url.split('/').length === 4 && req.method == 'GET' && the_url.split('/')[2] == 'users' && the_url.split('/')[1] == 'api') {
            const id: string = the_url.split('/')[3];
            getProduct(req, res, id);
        } else if ((req.url === '/api/users' && req.method === 'POST') || (req.url === '/api/users/' && req.method === 'POST')) {
            createProduct(req, res);
        }
        else if (the_url.split('/').length === 4 && req.method == 'PUT' && the_url.split('/')[2] == 'users' && the_url.split('/')[1] == 'api') {
            const id: string = the_url.split('/')[3];
            updateProduct(req, res, id);
        } else if (the_url.split('/').length === 4 && req.method == 'DELETE' && the_url.split('/')[2] == 'users' && the_url.split('/')[1] == 'api') {
            const id: string = the_url.split('/')[3];
            deleteProduct(req, res, id);
        }
        else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({message: 'Route not found'}));
            res.end();
        }
    } catch (err) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({message: 'Errors on the server side that occur during the processing of a request'}));
        res.end();
    }
    
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

export const database = new DataBase();
