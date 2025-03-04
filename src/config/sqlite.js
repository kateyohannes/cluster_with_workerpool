'use strict';

import Database from "better-sqlite3";

export const db = new Database('data.db',{
    verbose: console.log
});

const create_table = db.prepare(`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doc_id INTEGER,
        customer_id INTEGER,
        first_name TEXT,
        last_name TEST,
        company TEXT,
        city TEXT, 
        country TEXT,
        phone_1 TEXT,
        phone_2 TEXT,
        email TEXT,
        subscription_date TEXT,
        website TEXT
    )
`)

create_table.run();