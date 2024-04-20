const express = require('express');

const userAuth = require('../middleware/auth');

const router = express.Router();

const signupController = require('../controllers/signup');
const loginController = require('../controllers/login');

router.post('/signup', signupController.addUser);
router.post('/login', loginController.loginUser);
router.get('/status', userAuth.authenticate, loginController.checkPremiumStatus);

module.exports = router;