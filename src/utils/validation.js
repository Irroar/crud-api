import { validate as uuidValidate } from 'uuid';
import { invalidIdError, requredError, routeError } from './constants.js';

export const validateTypes = (data) => {
  let isValid = true;
  for (let [key, value] of Object.entries(data)) {
    if (key === 'username' && typeof value !== 'string') { isValid = false; throw new Error(requredError); }
    if (key === 'age' && typeof value !== 'number') { isValid = false; throw new Error(requredError);}
    if (key === 'hobbies' && !(Array.isArray(value))) { isValid = false; throw new Error(requredError);}
  }
  return isValid;
}

export const validateProps = (obj) => {
  let isValid = true;
  const requiredProps = ['username', 'age', 'hobbies'];
  if (!requiredProps.every((item) => obj[item])) { isValid = false; throw new Error(requredError); }
  return validateTypes(obj);
}

export const validateId = (id) => {
  if (!uuidValidate(id)) { throw new Error(invalidIdError) }
  else { return true; }
}

export const validateRoute = (url) => {
  if (url.split('/')[2] !== 'users') { throw new Error(routeError); };
  return true;
}