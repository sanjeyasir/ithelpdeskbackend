const userRepo = require('../repositories/user.repository');

const getUsers = async (req, res) => {
  try {
    const users = await userRepo.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    const user = await userRepo.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginInUser = async (req, res) => {
  try {
    const user = await userRepo.loginUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUserData = async (req, res) => {
    try {
      let data= req.body;
      const outcome = await userRepo.updateUserDataEntry(data);
      return res.status(200).json(outcome);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};


const deleteUserDataEntry = async (req, res) => {
    try {
      let data= req.body;
      const outcome = await userRepo.deleteUserDataEntry(data);
      return res.status(200).json(outcome);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

module.exports = {
  getUsers,
  addUser,
  loginInUser,
  updateUserData,
  deleteUserDataEntry
};
