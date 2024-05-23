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
    const validuser = await User.findOne({email: req.body.email});
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
 };


 export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(user){
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET );
      const {password: hashedpassword, ...rest} = user._doc;
      res.cookie('access token', token, {httpOnly:true}).status(200).json(rest);
    } else{
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedpassword = bcryptjs.hashSync(generatedPassword,10);
      const newuser = new User({
        username: req.body.name.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedpassword,
        profilePicture: req.body.photo,
      });
      await newuser.save();
      const token = jwt.sign({id: newuser._id}, process.env.JWT_SECRET );
      const {password: hashedpassword2, ...rest} = newuser._doc;
      res.cookie('access token', token, {httpOnly:true}).status(200).json(rest);
    }
    
  } catch (error) {
    next(error);
  }
 };

 export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};