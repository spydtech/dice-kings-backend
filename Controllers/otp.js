// controllers/otp.js
import  Twilio  from 'twilio';
import Otp from "../models/otpSchema.js"


// Replace with your Twilio credentials
const twilioAccountSid = 'AC2e78c87c95dec5619069f166510bee7c';
const twilioAuthToken = 'a34d269cbb38affb9245653e420e1699';
const twilioPhoneNumber = '+13203727462';
const client = new Twilio(twilioAccountSid, twilioAuthToken);

export const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).send('Phone number is required');
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    await Otp.findOneAndUpdate(
      { phoneNumber },
      { otp },
      { upsert: true, new: true }
    );

    res.status(200).send('OTP sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send OTP');
  }
};

export const verifyOtp = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).send('Phone number and OTP are required');
  }

  try {
    const otpRecord = await Otp.findOne({ phoneNumber, otp });
    if (!otpRecord) {
      return res.status(400).send('Invalid OTP');
    }

    // OTP verified successfully, remove the record
    await Otp.deleteOne({ phoneNumber });

    res.status(200).send('OTP verified successfully');
  } catch (error) {
    res.status(500).send('Failed to verify OTP');
  }
};


