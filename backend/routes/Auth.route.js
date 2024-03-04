import express from 'express';
import { login, signup, google } from '../controllers/Auth.controller.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', google);

export default router;