import User from "../models/User.model.js";
import bcryptjs from 'bcryptjs';
import { errorhandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


export const modulereg = async (req, res, next) => {
    const {email, registeredModules} = req.body;
    
    try {
        const validuser = await User.findOneAndUpdate(
            { email },
            { $addToSet: { registeredModules } }, // Use $addToSet to add to array if not already present
            { new: true } // To return the updated document
        );
       

      if (!validuser) return next(errorhandler(404, 'User not found'));
      res.status(201).json({message: "Module registered !"});
      
      
    } catch (error) {
      next(error);
    }
   };

export const registeredmodules = async (req, res, next) => {
    const {email} = req.body;
    try {
      const user = await User.findOne({email});
      //if (user) return user.registeredModules ;
      res.status(201).json({message: "Registered modules fetched continously!"});

      if (!user) return next(errorhandler(404, 'User not found'));
      
    } catch (error) {
      next(error);
    }

    
  };
  