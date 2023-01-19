const { respondOk, respondError } = require('utils/express-response')
const { GetAllUser } = require('resources/user/queries/get-all-user-query');
const logger = require('logger')

module.exports.GetAllUserController = async (req, res) => {
    try {
        let { offset=0, nolimit=false } = req.query;
        offset *= 1;

        logger.info("get all user request by user" + req.user.id);


        const feeds = await GetAllUser({offset, nolimit, id:req.user.id});

        return res.status(200).json(respondOk(feeds, "users feed sucessfully!"));

    } catch(error) {
        console.log(error)
        return res.status(500).json(respondError(500, "Network Error!"));
    }
}