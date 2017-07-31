import express from 'express';
import login from './login';
import logout from './logout';
import signup from './signup';

let router = express.Router();

console.log('auth index');

router.route('/login')
    .post(login);

router.route('/logout')
    .get(logout);

router.route('/signup')
    .post(signup);

module.exports = router;
