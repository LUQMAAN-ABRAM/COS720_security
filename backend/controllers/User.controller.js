import { errorhandler } from '../utils/error.js';
import User from "../models/User.model.js";

export const test = (req,res) => {
    res.json({
     message: "API is working",
    });
 };

 export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(errorhandler(401, 'You can only delete your account!'));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted!");
    } catch (error) {
        next(error);
    }
 }