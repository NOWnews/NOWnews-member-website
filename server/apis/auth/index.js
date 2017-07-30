import express from 'express';
import login from './login';
import signup from './signup';

let router = express.Router();

console.log('auth index');

router.route('/login')
    .post(login);

router.route('/signup')
    .post(signup);

module.exports = router;
