// import JWT from 'jsonwebtoken'
// import userModel from '../models/userModel.js'
// import { comparePassword, hashPassword } from '../helpers/authHelper.js'

// export const loginController = async (req, res) => {
//     try {
//         const { phoneNumber, password } = req.body;
//         if (!phoneNumber || !password) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Invalid phoneNumber or password",

//             });
//         }

//         // check user
//         const user = await userModel.findOne({ phoneNumber });
//         if (!user) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Phone Number is not register"
//             })
//         };
//         // compare login passwoed and saved password
//         const match = await comparePassword(password, user.password);
//         if (!match) {
//             return res.status(200).send({
//                 success: false,
//                 message: "Invalid Password",
//             });
//         }

//         // token
//         const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: "7d",
//         }); //"10h"->10 hours, "10d"->10 days, "10s"->10 seconds, "10"->10 milliSeconds

//         const userDetails = {
//             phoneNumber: user.phoneNumber,
//             _id: user._id,
//             uniqueId: user.uniqueId

//         };

//         const userDetailsJSON = JSON.stringify(userDetails);

//         res.cookie("userDetails", userDetailsJSON, {
//             expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
//             httpOnly: true,
//             secure: true,
//             sameSite: "none",
//         });

//         res.cookie("token", token, {
//             expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
//             httpOnly: true,
//             secure: true,
//             sameSite: "none",
//         });

//         res.status(200).send({
//             success: true,
//             message: "login successful",
//             user: userDetails,
//             token,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error in login",
//             error,
//         });
//     }
// }


// export const forgetPassword = async (req,res) => {

// }


import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import { comparePassword } from '../helpers/authHelper.js';

export const loginController = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        if (!phoneNumber || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid phoneNumber or password",
            });
        }

        // Check user
        const user = await userModel.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Phone Number is not registered",
            });
        }

        // Compare login password and saved password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }

        // Generate JWT token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d", // Token expires in 7 days
        });

        const userDetails = {
            phoneNumber: user.phoneNumber,
            _id: user._id,
            uniqueId: user.uniqueId,
        };

        // Set cookies with user details and token
        const userDetailsJSON = JSON.stringify(userDetails);
        res.cookie("userDetails", userDetailsJSON, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.cookie("token", token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(200).send({
            success: true,
            message: "Login successful",
            user: userDetails,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
}

export const forgetPassword = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).send({
                success: false,
                message: "Phone Number is required",
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Phone Number is not registered",
            });
        }

        // Generate OTP (for demo purposes, generate a simple 4-digit OTP)
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        // Update user with the new OTP (you should hash the OTP before saving it in a real scenario)
        user.otp = otp;
        await user.save();

        // Mock sending OTP (in real scenario, use SMS or email service to send OTP)
        console.log(`Sending OTP ${otp} to ${phoneNumber}`);

        res.status(200).send({
            success: true,
            message: "OTP sent successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in forget password",
            error,
        });
    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        
        // Check if phoneNumber and otp are provided
        if (!phoneNumber || !otp) {
            return res.status(400).send({
                success: false,
                message: "Phone Number and OTP are required",
            });
        }

        // Find the user by phoneNumber
        const user = await userModel.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Phone Number is not registered",
            });
        }

        // Compare hashed OTP from user object with plaintext OTP received
        const isMatch = await comparePassword(otp, user.otp);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid OTP",
            });
        }

        // Optionally, check if OTP has expired (implement your expiry logic here)

        // Clear the OTP after successful verification
        user.otp = undefined;
        await user.save();

        // Generate JWT token for further actions (like password reset)
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "15m", // Token expires in 15 minutes
        });

        // Send success response with token
        res.status(200).send({
            success: true,
            message: "OTP verified successfully",
            token,
        });
    } catch (error) {
        console.error("Error in OTP verification:", error);
        res.status(500).send({
            success: false,
            message: "Error in OTP verification",
            error,
        });
    }
};