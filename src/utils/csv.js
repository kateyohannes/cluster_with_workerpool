'use strict'
import fs from 'node:fs';
import csv from 'csv-parser';


export default function load_csv(file){ 
    return new Promise((resolver, reject)=>{
        const results = []
        fs.createReadStream(file).pipe(csv()).on('data', (data)=>{
            results.push(data);
        }).on('end', ()=>{
            resolver(results);
        }).on('error', (err)=>{
            reject(err);
        });
    });
}

