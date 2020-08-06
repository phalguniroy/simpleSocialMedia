const Sequelize = require('sequelize')
const DbModule = require('../config/database'); // Database
const db = DbModule.db;
module.exports = db.sequelize.define(
  'messages',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.STRING
    },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
)
