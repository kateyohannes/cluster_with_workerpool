'use strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from '../config/sqlite.js';
import load_csv from '../utils/csv.js';
import pool from '../utils/pool.js';

export function getOneUserService(id){
    try{
        const select_statement = db.prepare(`
            SELECT *
            FROM users
            WHERE id = ?
        `);

        const data = select_statement.get(id);
        return data;
    }catch(err){
        throw new Error(err);
    }
}

export function getAllUsersService(){
    try{
        const select_statement = db.prepare(`
            SELECT *
            FROM users
        `)
        const data = select_statement.all();
        return data;
    }catch(err){
        throw new Error(err);
    }
}

export async function insertUsersFromCsvFileService(file){
    let file_path = '';
    try{
        const __filename  = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const exact_path = path.resolve(__dirname, '..', '..', 'uploads');
        file_path = path.join(exact_path, file);
        // const parsed_csv = await load_csv(file_path);
        
        const parsed_csv = await pool.exec('load_csv', [file_path]);

        const insert_statment = db.prepare(`
            INSERT INTO users(
                doc_id,
                customer_id,
                first_name,
                last_name,
                company,
                city, 
                country,
                phone_1,
                phone_2,
                email,
                subscription_date,
                website
            ) 
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
    
        const insert_csv = db.transaction((parsed_csv) => {
            parsed_csv.forEach(row => {
                insert_statment.run(
                    row.Index,
                    row.Customer_Id,
                    row.First_Name,
                    row.Last_Name,
                    row.Company,
                    row.City,
                    row.Country,
                    row.Phone_1,
                    row.Phone_2,
                    row.Email,
                    row.Subscription_Date,
                    row.Website
                );
            });
        });
    
        insert_csv(parsed_csv);
        const data = {
            success: true,
            message: 'file uploaded, and inserted succesfully to sqlite',
        }

        return data;
    }catch(err){
        throw new Error(err);
    }finally{
        if(file_path){
            fs.unlinkSync(file_path);
        }
    }
}
