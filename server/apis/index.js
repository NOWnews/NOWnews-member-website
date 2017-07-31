import account from './account';
import auth from './auth';
import member from './member';

module.exports = function(app) {

    app.use('/api/account', account);
    app.use('/api/auth', auth);
    app.use('/api/member', member);

    return function(req, res, next) {
        return next();
    };
};
