const { User } = require('models')

module.exports.GetUserByPhone = async ({ phone_no, country_code }) => {
    return User.findOne({ 
        where: { 
            phone: phone_no
        }
    })
}