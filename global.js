let axios = require('axios');
let config = require('config');
global.apiServ = axios.create({
    baseURL: config.get('apiServer'),
    timeout: 300000,
    headers: config.get('headers')
});

global.nowlinkServ = axios.create({
    baseURL: config.get('nowlinkServ'),
    timeout: 300000,
    headers: config.get('headers')
});
