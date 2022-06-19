import { getUserById, updateUserById, deleteUserById, getUsers, createNewUser } from '../model/userController.js';
import { isIdProvided, getReqData, getId, getSuccessResponse } from './helpers.js';
import { validateRoute } from './validation.js';
import { internalError, contentTypeJson } from './constants.js'

export const renderRoute = async (req, res) => {
  validateRoute(req.url);
  if (isIdProvided(req.url)) {
    switch(req.method) {
      case 'GET':
        {
          const id = getId(req.url);
          const user = await getUserById(id);
          getSuccessResponse(user, res, 200);
          break; 
        }
      case 'PUT':
        {
          const id = getId(req.url);
          const reqBody = await getReqData(req);
          const updatedUser = await updateUserById(id, JSON.parse(reqBody));
          getSuccessResponse(updatedUser, res, 200);
          break;
        }
      case 'DELETE':
        {
          const id = getId(req.url);
          const deletedUser = await deleteUserById(id);
          getSuccessResponse(deletedUser, res, 204);
          break;
        } 
      default:
        throw new Error(internalError);
    }
  } else {
    switch(req.method) {
      case 'GET':
        {
          const users = await getUsers();
          getSuccessResponse(users, res, 200);
          break;
        }
      case 'POST':
        {
          const reqBody = await getReqData(req);
          const newUser = await createNewUser(JSON.parse(reqBody));
          getSuccessResponse(newUser, res, 201);
          break;
        }  
      default:
        throw new Error(internalError);
    }
  }
}