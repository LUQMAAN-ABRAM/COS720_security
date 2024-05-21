import express from 'express';
import { modulereg , registeredmodules} from '../controllers/Module.controller.js';


const router = express.Router();

router.post('/modulereg', modulereg);
router.post('/registeredmodules', registeredmodules)

export default router;