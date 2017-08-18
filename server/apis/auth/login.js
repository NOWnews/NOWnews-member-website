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
        debug('MAC Address = %s', MAC);

        if (MAC) {
            const NOWLinkData = {
                provider: member.data.account.provider,
                identity: member.data.account.identity,
                mac: MAC
            }
            debug('From BOX = %j', NOWLinkData);

            const result = await nowlinkServ.post('/signin', qs.stringify(NOWLinkData));

            debug('nowlinkServ signin result = %j', result);
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
