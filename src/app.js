'use strict';

import express from 'express';
import fibonacciRoute from './routes/fibonacci.route.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use('/', fibonacciRoute);

export default app;