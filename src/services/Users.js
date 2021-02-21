import axios from "../axios";

const getAll = () => {
  return axios.get("/users");
};

const get = id => {
  return axios.get(`/users/${id}`);
};

const create = data => {
  return axios.post("/users", data);
};

const update = (id, data) => {
  return axios.put(`/users/${id}`, data);
};

const remove = id => {
  return axios.delete(`/users/${id}`);
};

const removeAll = () => {
  return axios.delete(`/users`);
};

const findByTitle = title => {
  return axios.get(`/users?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};