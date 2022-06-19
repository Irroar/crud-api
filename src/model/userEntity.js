import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { notFoundError } from '../utils/constants.js'

export const usersdb = [{
  id: 'd9428888-122b-11e1-b85c-61cd3cbb3210',
  name: 'a',
  age: 2,
}];


export const getAllUsers = async () => {
  return new Promise((resolve, _) => {
    resolve(usersdb);
  });
};

export const getUser = async (id) => {
  return new Promise((resolve, reject) => {
    const user = usersdb.find((item) => { return item.id === id; });
    if (user) { 
      resolve(user);
    } else { 
      reject(new Error(notFoundError)); 
    }
  });
};

export const createUser = async (reqBody) => {
  return new Promise((resolve, reject) => {
    const newUser = {
      id: uuidv4(),
      ...reqBody,
    };
    usersdb.push(newUser);
    resolve(newUser);
  });
};

export const updateUser = async (id, reqBody) => {
  return new Promise((resolve, reject) => {
    const userIndex = usersdb.findIndex(item => item.id === id);
    if (userIndex !== -1) {
      for (let [key, value] of Object.entries(reqBody)) {
        usersdb[userIndex][key] = value;
      }
      resolve(usersdb[userIndex]);
    } else {
      reject(new Error(notFoundError));
    }     
  });
};

export const deleteUser = async (id) => {
  return new Promise((resolve, reject) => {
    const userIndex = usersdb.findIndex(item => item.id === id);
    if (userIndex !== -1) {
      const deletedUser = usersdb[userIndex];
      usersdb.splice(userIndex, 1);
      resolve(deletedUser);
    } else {
      reject(new Error(notFoundError));
    }
  })
}

