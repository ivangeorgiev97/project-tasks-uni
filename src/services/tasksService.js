import { apiService } from "./apiService";
import axios from "axios";


const apiUrl = "http://localhost:3006";
const resource = "tasks";

export const tasksService = {
  getAllTasks,
  getAllTasksByUserId,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};

function getAllTasks() {
  return apiService.getAll(resource);
}

// this can also be done with additional parameters in getAll
function getAllTasksByUserId(userId) {
  return axios.get(`${apiUrl}/${resource}?userId=${userId}`);
}

function getTaskById(id) {
  return apiService.getById(resource, id);
}

function addTask(task) {
  return apiService.add(resource, task);
}

function updateTask(id, task) {
  return apiService.update(resource, id, task);
}

function deleteTask(id) {
  return apiService.deleteObj(resource, id);
}
