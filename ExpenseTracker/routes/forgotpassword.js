const express = require('express');

const router = express.Router();

const forgotPasswordController = require('../controllers/forgotpassword');

router.post('/forgotpassword', forgotPasswordController.sendEmail);

module.exports = router;