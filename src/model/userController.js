import { usersdb } from './users.js';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

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
}

