import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const addOne = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deleteOne = (id) => {
  return axios.delete(baseUrl + `/${id}`);
};
export default {
  getAll: getAll,
  addOne: addOne,
  deleteOne: deleteOne,
};
