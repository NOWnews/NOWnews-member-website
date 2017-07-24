import Debug from 'debug';

const debug = Debug('NOWnews-member-website: api:controllers:auth:signup');
module.exports = async (req, res, next) => {

    try {
        let data = req.body;
        console.log('signup, "!!', data);
        // let { data: member } = await apiServ.post('/api/member', data);

        return res.json(member);

    } catch(err) {
        return res.json(err);
    }
};
