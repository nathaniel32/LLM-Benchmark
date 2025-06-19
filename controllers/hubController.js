const db = require('../utils/database');

exports.run_hub_sql = (req, res) => {
    const { sql } = req.params;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};