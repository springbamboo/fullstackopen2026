import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const addOne = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deleteOne = (id) => {
  return axios.delete(baseUrl + `/${id}`);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export default {
  getAll: getAll,
  addOne: addOne,
  deleteOne: deleteOne,
  update: update,
};
