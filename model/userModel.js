const Sequelize = require('sequelize');
const db = require('../dbConfig');

const User = db.define('User', {
   // Model attributes are defined here
   fullName: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   email: {
      type: Sequelize.STRING,
      allowNull: false,
      isEmail: true,
   },
   password: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   contactNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      isNumeric: true,
      unique: true,
   },
});

module.exports = User;
