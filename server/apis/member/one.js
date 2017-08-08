import Debug from 'debug';

const debug = Debug('NOWnews-member-website: api:controllers:member:one');
module.exports = async (req, res, next) => {

    try {
        // const { token } = req.session.member;
        // const { data: member } = await apiServ.get('/member');
        // const member = req.session.member;
        // fake data
        // const member = {
        //     nickname: '123',
        //     birthday: '2017-01-01',
        //     account: {
        //         identity: 'ali.li@nownews.com'
        //     }
        // }
        const member = {
          account: 'ali.li@nownews.com',
          nickname: 'ali',
          birthday: '2017-01-01'
        };

        debug('member = %j', member);

        return res.json(member);

    } catch(err) {
        return next(err);
    }
};
