const { User } = require('models')

module.exports.GetUserByIds = async ({ ids=[] }) => {
    return User.findAll({
        where: {
            id: ids
        }
    })
}