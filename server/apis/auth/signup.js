
import Debug from 'debug';
import axios from 'axios';
import qs from 'qs';
const debug = Debug('NOWnews-member-website: server:apis:auth:signup');
module.exports = async (req, res, next) => {

    try {
        let data = req.body;
        let query = req.query;
        // console.log(data, '!!signup', query);
        data = {
            provider: 'email',
            email: 'ali.li@nownews.com',
            password: 123,
            nickname: 'ALi',
            verifyCode: '562246'
        }

        let a = qs.stringify(data);
        console.log(a, '!!!!');
        let { data: member } = await axios.post('http://35.194.141.188:8080/v1/member/signup', a);
        console.log(member);
        return res.json(member);

    } catch(err) {
        console.log(err);
        return res.json(err);
    }
};
