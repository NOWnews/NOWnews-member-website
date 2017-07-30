let axios = require('axios');
let config = require('config');
global.apiServ = axios.create({
    baseURL: config.get('apiServer'),
    timeout: 300000,
    headers: {
        // ...config.get('headers'),
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
