const { User } = require('models')

module.exports.CreateUser = async ({ id, phone_no, country_code }) => {
    return User.create({ id, phone:phone_no, country_code })
}