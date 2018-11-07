const fetch = require('node-fetch');

const test = () => {

  fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => json)
};

module.exports = { test };