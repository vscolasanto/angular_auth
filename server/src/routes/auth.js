const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.get('/user', AuthController.checkToken, AuthController.userData);

module.exports = router;
