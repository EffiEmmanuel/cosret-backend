import twilio from 'twilio'
import otpGenerator from 'otp-generator'

const twilioSID = process.env.TWILIO_SID
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN

const twilioMessenger = twilio(twilioSID, twilioAuthToken)

export const sendOTP = (recipient) => {
    const OTP = otpGenerator.generate(6 , { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    
    twilioMessenger.messages.create({
        from: process.env.TWILIO_PHONE,
        to: recipient,
        body: `Your Carpalar verification code is ${OTP}`
    })

    return OTP
}