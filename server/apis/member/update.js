import Debug from 'debug';
import qs from 'qs';

const debug = Debug('NOWnews-member-website: api:controllers:member:update');
module.exports = async (req, res, next) => {

    try {
        const data = req.body;
        const formatData = qs.stringify(data);
        const { data: member } = await apiServ.patch('/member', formatData);

        debug('member = %j', member);

        return res.json(member);

    } catch(err) {
        return next(err);
    }
};
