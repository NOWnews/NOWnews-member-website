import Debug from 'debug';
import qs from 'qs';

const debug = Debug('NOWnews-member-website: api:controllers:auth:resetpw');
module.exports = async (req, res, next) => {

    try {
        const data = req.body;
        const formatData = qs.stringify(data);
        const { data: result } = await apiServ.patch('/member/resetpw', formatData);

        debug('result = %j', result);

        return res.json(result);

    } catch(err) {
        return next(err);
    }
};
