const axios = require('axios');
const config = require("config");
const { CreateOtp } = require('resources/auth/queries/create-otp-query');
const accountSid = process.env.TWILIO_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = require('twilio')(accountSid, authToken); 


function generateOTP() {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

module.exports.sendOtp = async (phone_no) => {
    try {
        const otp = generateOTP();
        
        const newOtp = await CreateOtp({phone_no, otp});

        const data = await client.messages 
        .create({ 
           body: 'Your otp for verification of orgconnect is '+ otp+".",  
           messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,      
           to: phone_no
        }) 
        return data;
    } catch (e) {
        console.log(e);
    }
}