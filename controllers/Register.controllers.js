import { User } from "../models/User.models.js";

import bcrypt from "bcrypt";

import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'

dotenv.config()

export const signup = async (req, res) => {
  const hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
  };

  const { username, email, password,} = req.body;
  try {
    const duplicateuser = await User.find({ username, email });
    if (duplicateuser && duplicateuser.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const pass = await hashPassword(password);

    const result = new User({
      username,
      email,
      password: pass,
    });
    const saveduser = await result.save();
    res
      .status(201)
      .send({ message: "User registered  successfully", user: result });
    // console.log("USER  REGISTERED", saveduser);
  } catch (error) {
    console.log("Error", error);
  }
};

// export const fetch = async (req, res) => {
//   try {
//     const userdata = await User.find();
//     res.status(200).json(userdata);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const login = async (req, res) => {
//   const { identifier, password } = req.body;

//   const checkIfEmail = String(identifier).includes("@");

//   let user = null;

//   if(checkIfEmail){
//     const user = await User.findOne({ email:identifier });
//   }else{
//     const user = await User.findOne({ username:identifier });
//   }

//   try {
//     if (!user) {
//       return res.status(400).json({ message: "Invalid username" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
//       expiresIn: "1h",
//     });
//     const  result = {
//         username:user?.username,
//         password:user?.password,
//         email:user?.email,
//         token:token
//     }

//     res.status(200).json({ message: "User logged in successfully", result });
//   } catch (error) {
//     console.log("Error", error);
//     res.status(500).json({ error: error.message });
//   }
//   // console.log("USER LOGGED IN", user);
// };
export const login = async (req, res) => {
    const { identifier, password } = req.body;
  
    if (!identifier || !password) {
      return res.status(400).json({ message: "Identifier and password are required" });
    }
  
    const checkIfEmail = String(identifier).includes("@");
  
    let user = null;
  
    try {
      if (checkIfEmail) {
        user = await User.findOne({ email: identifier });
      } else {
        user = await User.findOne({ username: identifier });
      }
  
      if (!user) {
        return res.status(400).json({ message: "Invalid username or email" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
  
      const result = {
        username: user.username,
        email: user.email,
        token: token
      };
  
      res.status(200).json({ message: "User logged in successfully", result });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "An error occurred during login" });
    }
  };
