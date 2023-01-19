const { User } = require('models')

module.exports.UpdateUser = async (data, id) => {
    return User.update(data, {
        where: {
            id: id
        }
    })
}