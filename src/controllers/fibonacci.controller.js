'use strict';

import pool from '../utils/pool.js';

export const fibonacciController = async (req, res)=>{
    const n = parseInt(req.params.n);

    if(isNaN(n) || n< 0){
        res.status(400).json({
            error: 'Invalid Input!'
        });
        return;
    }

    try{
        const result = await pool.exec('fibonacci', [n]);
        res.status(200).json({
            fibonnaci: result
        });
    }catch(err){
        res.status(500).json(err);
    }
}