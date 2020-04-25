import { apiService } from "./apiService";

const resource = "tasks";

export const tasksService = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};

function getAllTasks() {
  return apiService.getAll(resource);
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
