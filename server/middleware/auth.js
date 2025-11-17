import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protect = (req, res, next) => {
    try{
        const token = req.headers.token;
        const decoded = jwt.verify(token.process.env.JWT_SECRET)

        const user = await User.findById(decoded.UserId).select
        ("-password");

        if(!user) return res.json({success:false, message: "User not dound"});

        req.user = user;
        next();
    } catch(error){
        console.log(error.message);
        res.json({success: false,message: error.message});

    }
}