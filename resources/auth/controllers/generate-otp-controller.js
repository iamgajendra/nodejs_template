const { respondOk, respondError } = require('utils/express-response')
const { generateOtpValidation } = require('resources/auth/validators/generate-otp-validation');
const { sendOtp } = require('resources/auth/services/send-otp-service');
const logger = require('logger')

module.exports.GenerateOtp = async (req, res) => {
    try {
        const { phone_no, country_code } = req.body;

        logger.info("OTP requested for phone no" + phone_no);

        const { error } = generateOtpValidation({phone_no, country_code})

        if(error) {
            return res.status(400).json(respondError(400, error.details[0].message));
        }

        const data = await sendOtp("+"+ country_code + phone_no);

        if(data.sid) {
            return res.status(200).json(respondOk({type:'success'}, "OTP generated!"));
        } else {
            return res.status(200).json(respondError(200, "OTP failed!"));
        }

    } catch(error) {
        return res.status(500).json(respondError(500, "Network Error!"));
    }
}