const { Router } = require('express');
const router = Router();
const { createAccount, login, logout } = require('../controllers/User');

router.route('/register').post(createAccount);
router.route('/login').post(login);
router.route('/logout').get(logout);

module.exports = router;