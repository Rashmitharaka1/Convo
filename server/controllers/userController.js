import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import cloudinary from '../lib/cloudinary.js';     

//Signup New User
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body; // frontend sends fullName

  if (!fullName || !email || !password || !bio) {
    return res.json({ success: false, message: "Missing Details" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.json({ success: false, message: "Account already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    fullname: fullName, // ✅ use lowercase fullname to match model
    email,
    password: hashedPassword,
    bio
  });

  const token = generateToken(newUser._id);
  res.json({ success: true, userData: newUser, token, message: "Account created successfully" });
};


// Controller to login a user
export const login = async (req, res) => {
  try{
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    const isPasswordCorrect =  await bcrypt.compare(password, userData.password);

    if(!isPasswordCorrect){
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const token = generateToken(userData._id);
    res.json({ success: true, userData, token, message: "Login Successful" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
}

// Controller to check if user is authenticated
export const checkAuth = (req, res)=>{
  res.json({success: true, user:req.user});
}

//controller to update user profile details
export const updateProfile = async(req, res) => {
  try{
    const {profilePic, bio, fullName} = req.body;
    const userId = req.user._id;
    let updateUser;

    if(profilePic){
      await User.findByIdAndUpdate(userId, {bio, fullName}, {new: true});
    } else{
      const upload = await cloudinary.uploader.upload(profilePic);

      updateUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, bio, fullName}, {new: true});
    }
    res.json({success: true, user: updateUser})

}catch(error){
    console.log(error.message);
    res.json({success: false, message: error.message});
  }
}