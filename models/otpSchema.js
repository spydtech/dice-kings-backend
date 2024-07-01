// models/Otp.js
import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: '5m' }, // OTP will automatically be removed after 5 minutes
  },
}, { timestamps: true });

export default mongoose.model('Otp', otpSchema);
