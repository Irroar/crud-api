import { usersdb } from './users.js';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { validateProps } from '../utils/validation.js'

export const getAllUsers = async () => {
  return new Promise((resolve, _) => {
    resolve(usersdb);
  });
};

export const getUserById = async (id) => {
  return new Promise((resolve, reject) => {
    if (uuidValidate(id)) {
      const user = usersdb.find((item) => {
        return item.id === id;
      });

      if (user) { 
        resolve(user); 
      } else { 
        reject(new Error('User not found')); 
      }
    } else { 
      reject(new Error('Invalid uuid'));
    };
  })
};

export const createUser = async (reqBody) => {
  return new Promise((resolve, reject) => {
    if (validateProps(reqBody)) {
      const newUser = {
        id: uuidv4(),
        ...reqBody,
      };
      usersdb.push(newUser);
      resolve(newUser);
    } else {
      reject(new Error('Not all requred fields are provided'))
    } 
  });
};

export const updateUser = async (id, reqBody) => {
  return new Promise((resolve, reject) => {
    if (uuidValidate(id)) {
      const userIndex = usersdb.findIndex(item => item.id === id);
      console.log(reqBody)
      if (userIndex !== -1) {
        // TODO: validate the reqBody
        for (let [key, value] of Object.entries(reqBody)) {
          usersdb[userIndex][key] = value;
        }
        resolve(usersdb[userIndex]);
      } else {
        reject(new Error('User not found'));
      }      
    } else {
      reject(new Error('Invalid id'));
    }
  });
}

