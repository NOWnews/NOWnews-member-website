import Debug from 'debug';
import qs from 'qs';
import formatAccountData from '../../libs/formatAccountData';
const debug = Debug('NOWnews-member-website: server:apis:auth:signup');
module.exports = async (req, res, next) => {

    try {
        const data = formatAccountData(req.body);
        const query = req.query;
        const formatData = qs.stringify(data);
        const { data: member } = await apiServ.post('/member/signup', formatData);

        debug('signup member = %j', member);

        return res.json(member);

    } catch(err) {
        return next(err);
    }
};
