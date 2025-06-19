const db = require('../utils/database');
const path = require('path');
const fs = require('fs');

const schema_path = path.resolve(__dirname, '..', 'assets/schema.sql');
const create_table = fs.readFileSync(schema_path, 'utf8');

exports.run_hub_sql = (req, res) => {
    const { sql } = req.params;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.get_hub_sql_schema = (req, res) => {
    console.log("ok")
    res.json(create_table);
};