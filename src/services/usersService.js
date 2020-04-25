// import axios from "axios";
import { /* apiUrl */ apiService } from "./apiService";

const resource = "users";

export const usersService = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};

function getAllUsers() {
  return apiService.getAll(resource);
}

function getUserById(id) {
  return apiService.getById(resource, id);
}

function addUser(user) {
  return apiService.add(resource, user);
}

function updateUser(id, user) {
  return apiService.update(resource, id, user);
}

function deleteUser(id) {
  return apiService.deleteObj(resource, id);
}

/* 
export function login(username, password) {

}
*/
