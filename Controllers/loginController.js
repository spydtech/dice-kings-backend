import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from '../helpers/authHelper.js'

export const loginController = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        if (!phoneNumber || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid phoneNumber or password",

            });
        }

        // check user
        const user = await userModel.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Phone Number is not register"
            })
        };
        // compare login passwoed and saved password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }

        // token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        }); //"10h"->10 hours, "10d"->10 days, "10s"->10 seconds, "10"->10 milliSeconds

        const userDetails = {
            phoneNumber: user.phoneNumber,
            _id: user._id,
            uniqueId: user.uniqueId

        };

        const userDetailsJSON = JSON.stringify(userDetails);

        res.cookie("userDetails", userDetailsJSON, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.cookie("token", token, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(200).send({
            success: true,
            message: "login successful",
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