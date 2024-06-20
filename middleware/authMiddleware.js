import JWT from 'jsonwebtoken';
import userModel from '../models/userModel';

//Protected route jwt token based
export const requireSignIn = async (req,res,next)=>{
    try{
        const token=req.cookies.token;
        // console.log(token);
        if(!token){
            return res.status(200).json({
                success:false,
                message:"UnAuthorized Access token not found"
            })
        }
        else{
            JWT.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                    return res.status(200).json({
                        success:false,
                        message:"UnAuthorized Access wrong token"
                    })
                }
                next();
            });
        }
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"UnAuthorized Access",
            error
        })
    }
}