import Debug from 'debug';

const debug = Debug('NOWnews-member-website: api:controllers:auth:verifyCode');
module.exports = async (req, res, next) => {

    try {
        let data = req.body;
        // let { data: member } = await apiServ.post('/api/member', data);

        return res.json(data);

    } catch(err) {
        return res.json(err);
    }
};
