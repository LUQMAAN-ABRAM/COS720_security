import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/man-avatar-profile-picture-vector-260nw-229692004.jpg"
    }



}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

export default User;