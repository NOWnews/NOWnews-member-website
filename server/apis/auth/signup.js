import Debug from 'debug';
import qs from 'qs';
import formatAccountData from '../../libs/formatAccountData';
const debug = Debug('NOWnews-member-website: server:apis:auth:signup');
module.exports = async (req, res, next) => {

    try {
        const { MAC } = req.query;
        const data = formatAccountData(req.body);
        const formatData = qs.stringify(data);
        const { data: member } = await apiServ.post('/member/signup', formatData);

        debug('signup member = %j', member);
        debug('MAC Address = %s', MAC);

        if (MAC) {
            const NOWLinkData = {
                identity: member.identity,
                provider: member.provider,
                mac: MAC
            }
            debug('From BOX = %j', NOWLinkData);

            const result = await nowlinkServ.post('/signin', qs.stringify(NOWLinkData));

            debug('nowlinkServ signin result = %j', result);
        }

        return res.json(member);

    } catch(err) {
        return next(err);
    }
};
