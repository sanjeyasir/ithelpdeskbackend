const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/users/getUser', userController.getUsers);
router.post('/users/addUser', userController.addUser);

module.exports = router;
