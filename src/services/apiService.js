import axios from "axios";

export const apiUrl = "http://localhost:3006";

export const apiService = {
  getAll,
  getById,
  add,
  update,
  deleteObj,
};

function getAll(resource) {
  return axios.get(`${apiUrl}/${resource}`);
}

function getById(resource, id) {
  return axios.get(`${apiUrl}/${resource}/${id}`);
}

function add(resource, obj) {
  return axios.post(`${apiUrl}/${resource}`, obj);
}

function update(resource, id, obj) {
  return axios.put(`${apiUrl}/${resource}/${id}`, obj);
}

function deleteObj(resource, id) {
  return axios.delete(`${apiUrl}/${resource}/${id}`);
}
