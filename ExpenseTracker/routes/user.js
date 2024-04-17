const express = require('express');

const router = express.Router();

const signupController = require('../controllers/signup');
const loginController = require('../controllers/login');

router.post('/signup', signupController.addUser);
router.post('/login', loginController.loginUser);

module.exports = router;