'use strict'
import pool from '../utils/pool.js';

export async function getAllUserController(req, res){
    try{
        const data = await pool.exec('getAllUsersService');
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err);
    }
};

export async function getOneUserController(req, res){
    try{
        const { id } = req.params;
        const data = await pool.exec('getOneUserService', [id]);
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
};

export async function loadUsersFromCsvFileController(req, res){
    try{
        const file = req.file.filename;
        const data = await pool.exec('insertUsersFromCsvFileService', [req.file.filename]);
        return res.status(201).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
};

