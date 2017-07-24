let axiosLib = require('axios');
let config = require('config');

global.apiServ = axiosLib.create({
    baseURL: config.get('apiServer'),
    timeout: 300000,
    headers: config.get('headers')
});
