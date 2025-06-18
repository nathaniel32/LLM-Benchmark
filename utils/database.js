const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const db_path = path.resolve(__dirname, '..', 'assets/database.db');
const schema_path = path.resolve(__dirname, '..', 'assets/schema.sql');

const db = new sqlite3.Database(db_path, (err) => {
    if (err) {
        console.error('failed to connect to database:', err.message);
    } else {
        console.log('connected to the database');

        const create_table = fs.readFileSync(schema_path, 'utf8');
        db.exec(create_table, (err) => {
            if (err) {
                console.error('Failed to execute SQL file:', err.message);
            } else {
                console.log('database ready');
            }
        });
    }
});

module.exports = db;