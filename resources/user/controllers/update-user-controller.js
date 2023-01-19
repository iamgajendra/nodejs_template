const { respondOk, respondError } = require('utils/express-response')
const { updateUserValidation } = require('resources/user/validators/update-user-validation');
const { UpdateUser } = require('resources/user/queries/update-user-query');
const { GetUserById } = require('resources/user/queries/get-user-by-id-query')
const logger = require('logger')

module.exports.UpdateUserController = async (req, res) => {
    try {
        const { city, country, state, department, email, gender, name, title, url='' } = req.body;

        logger.info("User update request for user id" + req.user.id);

        const { error } = updateUserValidation({city, country, state, department, email, gender, name, title, url})
        
        if(error) {
            return res.status(400).json(respondError(400, error.details[0].message));
        }

        const updated = await UpdateUser({full_name: name, email, gender, current_profession: title, profile_image_url: url, city, country, state, department}, req.user.id);

        if(updated[0] === 1) {
            const user = await GetUserById({id: req.user.id})
            return res.status(200).json(respondOk(user, "Profile Updated!"));
        }

        return res.status(400).json(respondError(400, "error in updating"));

    } catch(error) {
        return res.status(500).json(respondError(500, "Network Error!"));
    }
}