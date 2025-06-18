const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'assets/database.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('failed to connect to database:', err.message);
    } else {
        console.log('connected to the database');

        const createTableSql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
            )
        `;

        db.run(createTableSql, (err) => {
            if (err) {
                console.error('failed to create users table:', err.message);
            } else {
                console.log('users table ready');
            }
        });
    }
});

module.exports = db;