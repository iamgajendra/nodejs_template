const { Otp } = require('models')

module.exports.CreateOtp = async ({ phone_no, otp }) => {
    const res = await Otp.findOne({ 
        where: { 
            phone: phone_no
        }
    })

    if(res) {
        return Otp.update({otp, verified: false}, {
            where: {
                phone: phone_no
            },
            returning: true,
            plain: true
        })
    } else {
        return Otp.create({ phone:phone_no, otp, verified: false });
    }
}