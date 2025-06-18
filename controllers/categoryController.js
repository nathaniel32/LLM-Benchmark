const db = require('../utils/database');

exports.create_category = (req, res) => {
    const { name, email } = req.body;
    const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;
    db.run(sql, [name, email], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'User added successfully', id: this.lastID });
    });
};

exports.get_all_categories = (req, res) => {
    const sql = `SELECT * FROM users`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};