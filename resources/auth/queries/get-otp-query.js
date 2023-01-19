const { Otp } = require('models')

module.exports.GetOtp = async ({ phone_no }) => {
    return Otp.findOne({ 
        where: { 
            phone: phone_no
        }
    })
}