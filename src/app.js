'use strict';

import morgan from 'morgan';
import express from 'express';
import fibonacciRoute from './routes/fibonacci.route.js';
import userRouter from './routes/user.route.js'
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use('/', fibonacciRoute);
app.use('/users', userRouter);
export default app;