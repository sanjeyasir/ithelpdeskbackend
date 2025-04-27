const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.User;


const SECRET_KEY = process.env.TOKEN_SECRET;


const createUser = async (data) => {
  try {
    // Check if username already exists
    const outcomes = await User.findAll({
      where: { username: data.username }
    });

    if (outcomes.length !== 0) {
      throw new Error('Cannot create user: username already exists!');
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10); // You can adjust salt rounds if needed
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Create new user
    await User.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      active: 0,
      created_by: null,
      created_date: data.created_date
    });

    return 'success';
  } catch (err) {
    console.error('Error creating user record:', err);
    throw new Error('Failed to create user record.');
  }
};

const getAllUsers = async () => {
  try {
    let masterdata = await User.findAll();
    masterdata = masterdata.map(m => ({
      id: m.id,
      username: m.username,
      email: m.email,
      active: m.active === 0 ? false : true,
      role:m.role,
    }));
    return masterdata;
  } catch (err) {
    console.error('Error getting master data entry:', err);
    throw new Error('Failed to get master data entry');
  }
};

const loginUser = async (data) => {
  try {
    // Find user by username
    const user = await User.findOne({
      where: { 
        username: data.username,
        active:1
      }
    });

    if (!user) {
      throw new Error('Invalid username or password.');
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new Error('Invalid username or password.');
    }

    // Create JWT payload
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      active: user.active
    };

    // Generate JWT token (valid for e.g. 1 hour)
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    return {
      message: 'Login successful',
      token: token
    };

  } catch (err) {
    console.error('Error during user login:', err);
    throw new Error('Login failed. Please check your credentials.');
  }
};

const updateUserDataEntry = async (data) => {
  try {
    const record = await User.findOne({
      where: { id: data.id }
    });

    if (!record) {
      throw new Error(`Record with id ${data.id} not found`);
    }

    await User.update(
      {
        username: data.username,
        email:data.email,
        active:data.active==true?1:0,
        created_by:data.created_by,
        role:data.role
      },
      {
        where: { id: data.id }
      }
    ); 

    return 'success';
  } catch (err) {
    console.error('Error updating master data entry:', err);
    throw new Error('Failed to update master data entry');
  }
};

const deleteUserDataEntry = async (data) => {
  try {
    const record = await User.findOne({
      where: { id: data.id }
    });

    if (!record) {
      throw new Error(`Record with id ${data.id} not found`);
    }

    await record.destroy();

    return 'success';
  } catch (err) {
    console.error('Error deleting master data entry:', err.message);
    throw new Error('Failed to delete master data entry');
  }
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  updateUserDataEntry,
  deleteUserDataEntry 
};
