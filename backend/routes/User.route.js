import express from 'express';
import { test, deleteUser } from '../controllers/User.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/', test);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;
 