import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from '../helpers/authHelper.js'

export const registerController = async (req,res) => {
    try {
        const {username, email, password} = req.body;

        // validations
        if(!username){
            return res.send({message: "UserName is required"})
        } 
         if(!email){
            return res.send({message: "email is required"})
        }
          if(!password){
            return res.send({message: "password is required"})
        }

        // Check User

        const exisitingUser = await userModel.findOne({email});
        // exitsitingUser
        if(exisitingUser) {
            return res.status(200).send({
                success:false,
                message: "User Already Register Please login"
            });
        }

        // register User
        const hashedPassword = await hashPassword(password);
        // save
        const user = await new userModel({
            username,
            email,
            password: hashedPassword,
        }).save();
        res.status(201).send({
            success:true,
            message: "User Register Successfully",
            user,
        });
    } catch (error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in regesteration",
            error,
        });
    }
};