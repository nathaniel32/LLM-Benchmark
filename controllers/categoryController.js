const db = require('../utils/database');

exports.create_category = (req, res) => { 
    const { c_category } = req.body;
    const sql = `INSERT INTO t_category (c_category) VALUES (?)`;
    const category_trimmed = c_category ? c_category.trim() : null;
    db.run(sql, [category_trimmed], function(err) {
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