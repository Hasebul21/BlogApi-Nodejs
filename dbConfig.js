const Sequelize = require('sequelize');

const database = 'test';
const username = 'root';
const password = '';

const db = new Sequelize(database, username, password, {
   host: 'localhost',
   dialect: 'mysql',
});

module.exports = db;
