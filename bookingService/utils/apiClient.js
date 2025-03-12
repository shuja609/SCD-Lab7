const axios = require('axios');

const userServiceClient = axios.create({
  baseURL: 'http://localhost:3001/api/users'
});

const carServiceClient = axios.create({
  baseURL: 'http://localhost:3002/api/cars'
});

module.exports = { userServiceClient, carServiceClient };