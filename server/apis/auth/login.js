import Debug from 'debug';
import qs from 'qs';
import formatAccountData from '../../libs/formatAccountData';

const debug = Debug('NOWnews-member-website: api:controllers:auth:login');
module.exports = async (req, res, next) => {

    try {
        const { MAC } = req.query;
        const data = formatAccountData(req.body);
        const formatData = qs.stringify(data);
        const { data: member } = await apiServ.post('/member/login', formatData);

        debug('logined member = %j', member);

        if (MAC) {
            const NOWLinkData = {
                memberId: member.data.id,
                identity: member.data.account.identity,
                mac: MAC
            }
            console('From BOX')
            // await nowlinkServ.post('/status', qs.stringify(NOWLinkData));
        }
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
