import Debug from 'debug';

const debug = Debug('NOWnews-member-website: api:controllers:member:one');
module.exports = async (req, res, next) => {

    try {
        const { token } = req.session.member;
        const { data: member } = await apiServ.get('/member');

        debug('member = %j', member);

        return res.json(member);

    } catch(err) {
        return next(err);
    }
};
