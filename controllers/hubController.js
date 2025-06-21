const db = require('../utils/database');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

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
    res.json(create_table);
};

exports.use_proxy = async (req, res) => {
    const { url, method = 'GET', headers = {}, body } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'Missing url in request body' });
    }

    try {
        const fetchOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        };

        if (method !== 'GET' && method !== 'HEAD' && body !== undefined) {
            fetchOptions.body = JSON.stringify(body);
        }

        const response = await fetch(url, fetchOptions);

        // Filter header
        response.headers.forEach((value, key) => {
            if (!['content-encoding', 'content-length', 'transfer-encoding', 'connection'].includes(key.toLowerCase())) {
                res.setHeader(key, value);
            }
        });

        res.status(response.status);

        const data = await response.buffer();
        res.send(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};