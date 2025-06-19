const db = require('../utils/database');

exports.create_model = (req, res) => { 
    const { c_model } = req.body;
    const sql = `INSERT INTO t_model (c_model) VALUES (?)`;
    const model_trimmed = c_model ? c_model.trim() : null;
    db.run(sql, [model_trimmed], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Model added successfully', id: this.lastID });
    });
};

exports.get_all_models = (req, res) => {
    const sql = `SELECT * FROM t_model`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.delete_model = (req, res) => {
    const { c_id } = req.params;
    const sql = `DELETE FROM t_model WHERE c_id = ?`;
    db.run(sql, [c_id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: `ID ${c_id} not found` });
        res.json({ message: 'Model deleted successfully' });
    });
};