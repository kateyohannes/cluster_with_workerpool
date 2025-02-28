'use strict';

import { Router } from 'express';
import { fibonacciController } from '../controllers/fibonacci.controller.js';

const router = Router();

router.get('/fib/:n', fibonacciController);

export default router;