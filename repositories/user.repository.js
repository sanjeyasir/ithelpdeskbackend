const db = require('../models');
const User = db.User;

const getAllUsers = async () => {
  return await User.findAll();
};

const createUser = async (data) => {
  return await User.create(data);
};

module.exports = {
  getAllUsers,
  createUser
};
