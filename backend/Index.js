import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './routes/User.route.js';
import AuthRoutes from './routes/Auth.route.js';
import ModuleRoutes from './routes/Module.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoose.connect(process.env.Mongo).then( () => {
    console.log("connected to Mongodb");
})
.catch( (err) => {
    console.log(err);
});

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('server running on port 3000!');
});


app.use('/backend/user', UserRoutes);
app.use('/backend/auth', AuthRoutes);
app.use('/backend/module', ModuleRoutes);

app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500 ;
    const message = err.message || "Internal server error";
    return res.status(statuscode).json({
        success: false,
        statuscode,
        message
    });

});