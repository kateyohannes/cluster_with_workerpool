'use strict';


import { Router } from 'express';
import { upload } from '../config/multer.js';
import {
    getOneUserController, 
    getAllUserController,
    loadUsersFromCsvFileController,
} from '../controllers/user.controller.js';

const router = Router();

router.get('/', getAllUserController);
router.get('/:id', getOneUserController);
router.post('/load_csv', upload.single('csv_file'), loadUsersFromCsvFileController);

export default router;
