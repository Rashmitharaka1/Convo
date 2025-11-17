import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protect = async (req, res, next) => {
    try {
        // 1. Get token from headers
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Find user by ID inside decoded token
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // 4. Attach user to request
        req.user = user;

        // 5. Continue
        next();

    } catch (error) {
        console.log("Protect middleware error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
