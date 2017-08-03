import Debug from 'debug';
import qs from 'qs';
import formatAccountData from '../../libs/formatAccountData';

const debug = Debug('NOWnews-member-website: api:controllers:auth:forgotpw');
module.exports = async (req, res, next) => {

    try {
        const data = formatAccountData(req.body);
        const formatData = qs.stringify(data);
        const { data: result } = await apiServ.post('/member/forgotpw', formatData);

        debug('result = %j', result);

        return res.json(result);

    } catch(err) {
        return next(err);
    }
};
