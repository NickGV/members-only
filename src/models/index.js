const sequelize = require("../config/database");
const User = require("./User");
const Message = require("./Message");

module.exports = {
  sequelize,
  User,
  Message,
};
