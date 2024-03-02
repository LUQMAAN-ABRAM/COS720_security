import User from "../models/User.model.js";
import bcryptjs from 'bcryptjs';
import { errorhandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

 export const login = async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const validuser = await User.findOne({email});
    if (!validuser) return next(errorhandler(404, 'User not found'));
    const validpassword = bcryptjs.compareSync(password, validuser.password);
    if (!validpassword) return next(errorhandler(401, 'Incorrect credentials'));
    if (validuser && validpassword){
      console.log("valid credentials");
    }
    const token = jwt.sign({id: validuser._id}, process.env.JWT_SECRET );
    const {password: hashedpassword, ...rest} = validuser._doc;
    res.cookie('access token', token, {httpOnly:true}).status(200).json(rest);
  } catch (error) {
    next(error);
  }
 }