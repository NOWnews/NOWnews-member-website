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

        if (MAC) {
            const NOWLinkData = {
                identity: member.identity,
                mac: MAC
            }
            console('From BOX')
            // await nowlinkServ.post('/register', qs.stringify(NOWLinkData));
        }
        return res.json(member);

    } catch(err) {
        return next(err);
    }
};
