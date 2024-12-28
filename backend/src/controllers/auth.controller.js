import fs from 'fs';
import path from 'path';
import multer from 'multer';
import cloudinary from "../lib/cloudinary.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body
   
   
    
 try{
      //hash password
      if(!fullName||!email||!password)
      {
        return res.status(400).json({message:"All fields are required"})
      }
     if(password.length<6)
        {
           return res.status(400).json({message:"Password must be 6 character"})
        }
        const user=await User.findOne({email})
        if(user) return res.status(400).json({message:"Email already Exits"})
         const hashedPassword =await bcrypt.hash(password,10)

        const newUser=new User({
            fullName,
            email,
            password:hashedPassword
        })
   if (newUser)
   {
      generateToken(newUser._id,res)
      await newUser.save();
      res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic,
      });
   }
   else{
    res.status(400).json({mesage:"Invalid user data"})
   }
 } 
 catch(error)
 { console.log("Error in signup controller",error.message);
    res.status(500).json({message:"Internal server error"})

 } 

}
export const login=async(req,res)=>{
  const {email,password}=req.body;
  console.log(email,password);
  try{
       const newUser=await User.findOne({email})
       if(!newUser)
       {
         return res.status(400).json({message:"Invalid credential"})
       }
      const ispasswordCorrect= await bcrypt.compare(password,newUser.password)
      if(!ispasswordCorrect)
      {
        return res.status(400).json({message:"Invalid credential"}) 
      }
      generateToken(newUser._id,res) 
      res.status(200).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic, 
      })
  }
  catch(error)
  {
    console.log("Error in login controller",error.message)
    res.status(500).json({message:"Internal Server Error"});
  }

  
};

export const logout=async(req,res)=>{
    try{
   res.cookie("jwt","",{maxAge:0})
   res.status(200).json({message:"Logged out successfully"});
    }
    catch(error)
    {
       console.log("Error in the logout controller",error.message);
       res.status(500).json({message:"Internal Server Error"});
    }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join("C:/Users/chitteswaran/OneDrive/Desktop/PORTFOLIO-REACT/CHAT-APP/backend", 'uploads'); // Temporary folder
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true }); // Create folder if it doesn't exist
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use a timestamped filename
  },
});

const upload = multer({ storage:storage,limits: { fileSize: 10 * 1024 * 1024 } }).single('profilePic'); // Handle a single file with the field name 'profilePic',it can upload only a the 10 mb

export const updateProfile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ message: "File upload failed" });
    }

    try {
      const userId = req.user._id;
      const filePath = req.file?.path;

      if (!filePath) {
        return res.status(400).json({ message: "Profile picture is required" });
      }

      try {
        // Fetch the user by ID
        const prvdata = await User.findById(userId);
      
        if (!prvdata || !prvdata.profilePic) {
          throw new Error("User or profile picture not found.");
        }
      
        // Remove the old profile picture from Cloudinary
        await cloudinary.uploader.destroy(prvdata.profilePic);
        console.log("Old profile picture deleted successfully.");
      } catch (error) {
        console.log("Error while deleting old data:", error.message);
      }
      

      // Upload file to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(filePath);

      // Delete local file after upload
      fs.unlinkSync(filePath);

      // Update user's profile
      const updateUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: uploadResponse.secure_url },
        { new: true }
      );

      res.status(200).json(updateUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
 
export const checkAuth=async(req,res)=>{
try{
  res.status(200).json(req.user);

}
catch(error)
{ console.log("Error in CheckAuth controller",error.message)
  res.status(500).json({message:"Internal server Error"})

}
}