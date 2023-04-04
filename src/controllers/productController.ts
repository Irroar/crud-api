import { checkDataForCreateFunction, checkThatThisIsUUID4 } from '../utils';
import { database } from '../index';
import { v4 as uuid4 } from 'uuid';

// Gets all products GET /api/products
async function getProducts(req, res) {
    try {
      const products = await database.getAll();
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(products));
      res.end();
    } catch (error) {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({message: 'Errors on the server side that occur during the processing of a request'}));
      res.end();
    }
}

//Get single products
async function getProduct(req, res, id: string) {
    try {
        if (checkThatThisIsUUID4(id)) {
            const product = await database.getById(id);
            if (!product) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({message: 'User not found'}));
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(product));
                res.end();
            }
        } else {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({message: 'Not an uuid'}));
            res.end();
        }
        
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({message: 'Errors on the server side that occur during the processing of a request'}));
        res.end();
    }
}

//Create single product
//POST /api/products
async function createProduct(req, res) {
    try {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        })

        req.on('end', async () => {
            try {  
                JSON.parse(body);
            } catch(err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({message: 'Errors on the server side that occur during the processing of a request'}));
                return res.end();
            }
            const { username, age, hobbies } = JSON.parse(body);
            const neededTypes = checkDataForCreateFunction(username, age, hobbies);
            if (neededTypes) {
                type User = {
                    username: string,
                    age: number,
                    hobbies: string[]
                }
                const product: User = {
                    username,
                    age,
                    hobbies
                }
                const someProduct = {id: uuid4(), ...product};
                const newProduct = await database.add(someProduct);
                res.writeHead(201, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify(someProduct));
            } else {
                res.writeHead(400, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({message: 'incorrect data for new user'}));
            }
            
        });
        
    } catch (error) {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({message: 'Errors on the server side that occur during the processing of a request'}));
      res.end();
    }
}

// PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        
        type User = {
            username: string,
            age: number,
            hobbies: string[]
        }
        if (checkThatThisIsUUID4(id)) {
            const product = await database.getById(id);
            if (!product) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({message: 'User not found'}));
                res.end();
            } else {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk.toString();
                })

                req.on('end', async () => {
                    try {  
                        JSON.parse(body);
                    } catch(err) {
                        res.writeHead(500, {'Content-Type': 'application/json'});
                        res.write(JSON.stringify({message: 'Errors on the server side that occur during the processing of a request'}));
                        return res.end();
                    }
                    const { username, age, hobbies } = JSON.parse(body);
                    const neededTypes = checkDataForCreateFunction(username, age, hobbies);
                    if (neededTypes) {
                        const productData: User = {
                            username: username,
                            age: age,
                            hobbies: hobbies
                        }
                        const updProduct = await database.update(id, productData);
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        return res.end(JSON.stringify(updProduct));
                    } else {
                        res.writeHead(400, {'Content-Type': 'application/json'});
                        return res.end(JSON.stringify({message: 'incorrect data to update user'}));
                    }
                });
            }
        } else {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({message: 'Not an uuid '}));
            res.end();
        }
        
        
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({message: 'Errors on the server side that occur during the processing of a request'}));
        res.end();
    }
}

//Delete single products
//DELETE /api/products/:id
async function deleteProduct(req, res, id: string) {
    try {
        
        if (checkThatThisIsUUID4(id)) {
            const product = await database.getById(id);

            if (!product) {
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.write(JSON.stringify({message: 'User not found'}));
                res.end();
            } else {
                await database.delete(id);
                res.writeHead(204, {'Content-Type': 'application/json'});
                res.end();
            }
        } else {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.write(JSON.stringify({message: 'Not an uuid'}));
            res.end();
        }
        
        
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({message: 'Errors on the server side that occur during the processing of a request'}));
        res.end();
    }
}

export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}