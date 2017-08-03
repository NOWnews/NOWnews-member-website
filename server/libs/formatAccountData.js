import Debug from 'debug';

const debug = Debug('NOWnews-member-website: api:libs:formatAccountData');
module.exports = (data) => {
    debug('before = %j', data);

    switch (data.provider) {
        case 'phone':
            data.phone = data.phone.replace(/^0*/, '');
            delete data.email;
            break;
        case 'email':
            delete data.phone;
            delete data.countryCode;
            break;
    }

    debug('after = %j', data);
    return data;
};
