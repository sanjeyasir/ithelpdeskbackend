const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middleware/authentication');

router.get('/users/getUsers', userController.getUsers);
router.post('/users/addUser', userController.addUser);
router.post('/login', userController.loginInUser);
router.post('/users/updateData', userController.updateUserData);
router.post('/users/deleteData', userController.deleteUserDataEntry);

module.exports = router;
