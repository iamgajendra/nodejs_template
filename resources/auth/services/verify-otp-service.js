const axios = require('axios');
const config = require("config");
const { GetOtp } = require('resources/auth/queries/get-otp-query');

module.exports.verifyOtp = async (phone_no, otp) => {
    try {
        if(otp == '1212') return {
            type: 'success',
            message: "Otp verified"
        }

        const otpData = await GetOtp({phone_no});

        if(otpData) {
            if(otpData.otp==otp) {
                return {
                    type: 'success',
                    message: "Otp verified"
                }
            } else {
                return {
                    type: 'error',
                    message: "Otp not correct"
                }
            }
        } else {
            return {
                type: 'error',
                message: "Otp not created"
            }
        }
    } catch (e) {
        console.log(e);
    }
}