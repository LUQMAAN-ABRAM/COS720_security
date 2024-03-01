import User from "../models/User.model.js";
import bcryptjs from 'bcryptjs';
import { errorhandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const {username, email, password} = req.body;
  const hashedpassword = bcryptjs.hashSync(password, 10);
  const newuser = new User({username, email, password: hashedpassword});

  try {
    await newuser.save();
    res.status(201).json({message: "User created successfully!"});

  } catch (error) {
    next(error);
    
  }
  
 };