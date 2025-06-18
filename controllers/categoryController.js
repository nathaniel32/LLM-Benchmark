const db = require('../utils/database');

exports.create_category = (req, res) => { 
    const { c_category } = req.body;
    const sql = `INSERT INTO t_category (c_category) VALUES (?)`;
    db.run(sql, [c_category], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Category added successfully', id: this.lastID });
    });
};

exports.get_all_categories = (req, res) => {
    const sql = `SELECT * FROM t_category`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};