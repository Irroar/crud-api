import { getAllUsers } from "../model/users.js"

export const routing = {
  '/user' : getAllUsers,
}