const db = require('../utils/database');

exports.create_input = (req, res) => { 
    const { c_input, c_rule, c_temperature, c_note, t_category_id } = req.body;
    const sql = `INSERT INTO t_input (c_input, c_rule, c_temperature, c_note, t_category_id) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [c_input.trim(), c_rule.trim(), c_temperature, c_note.trim(), t_category_id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Input added successfully', id: this.lastID });
    });
};

exports.delete_input = (req, res) => {
    const { c_id } = req.params;
    const sql = `DELETE FROM t_input WHERE c_id = ?`;
    db.run(sql, [c_id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: `ID ${c_id} not found` });
        res.json({ message: 'Input deleted successfully' });
    });
};