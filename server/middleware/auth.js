// auth.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) throw new Error("User not found");

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default protect;
