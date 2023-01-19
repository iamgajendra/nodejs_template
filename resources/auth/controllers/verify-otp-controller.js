const { respondOk, respondError } = require('utils/express-response')
const { verifyOtpValidation } = require('resources/auth/validators/verify-otp-validation');
const { verifyOtp } = require('resources/auth/services/verify-otp-service');
const { GetUserByPhone } = require('resources/auth/queries/get-user-by-phone-query');
const { CreateUser } = require('resources/auth/queries/create-user-query');
const token = require('utils/token')
const logger = require('logger')
const uuid = require('uuid');

module.exports.VerifyOtp = async (req, res) => {
    try {
        const { phone_no, country_code, otp } = req.body

        logger.info("OTP Verification Requested for" + phone_no + "for OTP" + otp)

        const { error } = verifyOtpValidation({ phone_no, country_code, otp })

        if (error) {
            return res.status(400).json(respondError(400, error.details[0].message));
        }

        const data = await verifyOtp("+" + country_code + phone_no, otp)

        if(data.type === "error") {
            return res.status(201).json(respondOk(data, data.message));
        }

        const user = await GetUserByPhone({phone_no, country_code});

        if(user === null) {
            const id = uuid.v4();
            const newUser = await CreateUser({ id, phone_no, country_code })

            const generatedTokenNewUser = await token.generate({ id: newUser.id });

            return res.header('auth-token', generatedTokenNewUser).status(200).json(respondOk({accessToken: generatedTokenNewUser, user: newUser, otpData: data}, "OTP verified!"));
        }

        const generatedTokenOldUser = await token.generate({ id: user.id });

        return res.header('auth-token', generatedTokenOldUser).status(200).json(respondOk({accessToken: generatedTokenOldUser, user: user, otpData: data}, "OTP verified!"));

    } catch (error) {
        console.log(error)
        return res.status(500).json(respondError(500, "Network Error!"));
    }
}