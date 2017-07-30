import Debug from 'debug';
import qs from 'qs';
const debug = Debug('NOWnews-member-website: api:controllers:account:verifyCode');
module.exports = async (req, res, next) => {

    try {
        let data = req.body;
        data = {
            provider: 'email',
            email: 'ali.li@nownews.com',
        }
        let a = qs.stringify(data);
        console.log(a, '!!verify');
        let { data: member } = await apiServ.get(`/account/verify?${a}`);
        console.log(member);
        return res.json(member);

    } catch(err) {
        console.log(err, '!!!');
        return res.json(err);
    }
};
