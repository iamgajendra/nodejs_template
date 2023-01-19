const { User } = require('models')

module.exports.GetUserById = async ({ id }) => {
    return User.findByPk(id)
}