import Debug from 'debug';
import qs from 'qs';

const debug = Debug('NOWnews-member-website: api:controllers:member:updatepw');
module.exports = async (req, res, next) => {

    try {
        const member = req.session.member;
        const data = req.body;
        const formatData = qs.stringify({
            id: member.id,
            oldPasswd: data.oldPassword,
            newPasswd: data.password,
            token: member.token
        });

        const { data: result } = await apiServ.patch('/member/updatepw', formatData);

        debug('result = %j', result);

        return res.json(result);

    } catch(err) {
        return next(err);
    }
};
