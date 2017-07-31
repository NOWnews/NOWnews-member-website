import Debug from 'debug';
import qs from 'qs';

const debug = Debug('NOWnews-member-website: api:controllers:auth:login');
module.exports = async (req, res, next) => {

    try {
        const data = req.body;
        const formatData = qs.stringify(data);
        const { data: member } = await apiServ.post('/member/login', formatData);

        debug('logined member = %j', member);

        req.session.member = {
            ...member.data,
            token: member.token,
            nickname: member.nickname
        }

        return res.json(member);

    } catch(err) {
        return next(err);
    }
};
