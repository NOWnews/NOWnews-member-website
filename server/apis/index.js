import account from './account';
import auth from './auth';

module.exports = function(app) {

    app.use('/api/account', account);
    app.use('/api/auth', auth);

    return function(req, res, next) {
        return next();
    };
};
