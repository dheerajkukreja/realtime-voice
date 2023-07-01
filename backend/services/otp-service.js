const crypto = require('crypto')


const smsSid = process.env.SMS_SID
const smsAuthToken = process.env.SMS_SID

const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true
})

class OtpService {
    generateOtp = () => {
        const Otp = crypto.randomInt(1000, 9999)
        return Otp
    }

    sendBySms = async (phone, otp) => {
        return await twilio.messages.create({
            to:phone,
            from: process.env.SMS_FROM_PHONE,
            body: `Your coders house otp is ${otp}`
        })
    }

    verifyotp = (hashedOtp, computedhash) => {
        return computedhash === hashedOtp;
    }

}

module.exports = new OtpService();