import Debug from 'debug';
import qs from 'qs';

const debug = Debug('NOWnews-member-website: api:controllers:auth:login');
module.exports = async (req, res, next) => {

    try {
        let data = req.body;
        data = {
            provider: 'email',
            email: 'ali.li@nownews.com',
            password: 123,
        }
        let a = qs.stringify(data);
        let { data: member } = await apiServ.post('/member/login', a);
        console.log(member, '!!login');
        return res.json(member);

    } catch(err) {
        console.log(err, '!!!');
        return res.json(err);
    }
};
