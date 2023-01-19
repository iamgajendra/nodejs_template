const express = require('express');
const { GenerateOtp } = require('resources/auth/controllers/generate-otp-controller')
const { VerifyOtp } = require('resources/auth/controllers/verify-otp-controller')
const router = express.Router();

// // generate otp 
// router.post('/generate', GenerateOtp)
// // verify otp
// router.post('/verify', VerifyOtp )

module.exports = router;