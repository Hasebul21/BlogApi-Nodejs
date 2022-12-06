const Sequelize = require('sequelize');
const db = require('../dbConfig');

const Story = db.define('Story', {
   // Model attributes are defined here
   title: {
      type: Sequelize.STRING,
      notEmpty: true,
      len: [3, 100],
   },
   email: {
      type: Sequelize.STRING,
      notEmpty: true,
      isEmail: true,
      unique: true,
   },
   description: {
      type: Sequelize.STRING,
      notEmpty: true,
      len: [3, 2000],
   },
});

module.exports = Story;
