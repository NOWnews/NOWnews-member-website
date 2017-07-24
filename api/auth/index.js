import express from 'express';
import signup from './signup';
import verifyCode from './verifyCode';

let router = express.Router();

router.route('/signup')
    .post(signup);

router.route('/verifyCode')
    .get(verifyCode);

module.exports = router;
