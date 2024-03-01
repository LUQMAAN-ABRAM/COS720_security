import User from "../models/User.model.js";

export const signup = async (req,res) => {
  const {username, email, password} = req.body;
  const newuser = new User({username, email, password});
  await newuser.save();
  res.status(201).json({message: "User created successfully!"});
 };