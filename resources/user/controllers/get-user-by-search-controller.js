const { respondOk, respondError } = require('utils/express-response')
const { GetUserBySearch } = require('resources/user/queries/get-user-by-search-query');
const logger = require('logger')

module.exports.GetUserBySearchController = async (req, res) => {
    try {
        let { offset=0 } = req.query;
        offset *= 1;
        const { searchText } = req.params;

        logger.info("get all user by searchText request by user" + req.user.id);


        const feeds = await GetUserBySearch({searchText, offset, id:req.user.id});

        return res.status(200).json(respondOk(feeds, "users search sucessfull!"));

    } catch(error) {
        console.log(error)
        return res.status(500).json(respondError(500, "Network Error!"));
    }
}