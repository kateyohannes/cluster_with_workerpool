'use strict'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        const __filename  = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const file_path = path.resolve(__dirname, '..', '..', 'uploads');
        cb(null, file_path);
    },
    filename: function(req, file, cb){
        const unique_prefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, unique_prefix + '-' + file.originalname);
    }
})

export const upload = multer({
    storage: storage
});
