import Debug from 'debug';
import qs from 'qs';
import formatAccountData from '../../libs/formatAccountData';
const debug = Debug('NOWnews-member-website: api:controllers:account:verifyCode');
module.exports = async (req, res, next) => {

    try {
        const data = formatAccountData(req.body);
        const formatData = qs.stringify(data);
        const { data: result } = await apiServ.get(`/account/verify?${formatData}`);

        return res.json(result);

    } catch(err) {
        return next(err);
    }
};
