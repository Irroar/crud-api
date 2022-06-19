import { getAllUsers, getUser, createUser, updateUser, deleteUser } from './userEntity.js';
import { validateId, validateProps, validateTypes } from '../utils/validation.js'

export const getUserById = async (id) => {
  if (validateId(id)) {
    return await getUser(id);
  }
}

export const updateUserById = async (id, reqBody) => {
  if (validateId(id) && validateTypes(reqBody)) {
    return await updateUser(id, reqBody);
  }
}

export const deleteUserById = async (id) => {
  if (validateId(id)) {
    return await deleteUser(id);
  }
}

export const getUsers = async () => {
  return await getAllUsers();
}

export const createNewUser = async (reqBody) => {
  if (validateProps(reqBody)) {
    return await createUser(reqBody);
  }
}
