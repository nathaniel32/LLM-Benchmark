const db = require('../utils/database');

exports.create_output = (req, res) => { 
    const { c_output, c_total_duration, c_token, c_score, c_note, c_source, t_input } = req.body;
    const sql = `INSERT INTO t_output (c_output, c_total_duration, c_token, c_score, c_note, c_source, t_input) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [c_output, c_total_duration, c_token, c_score, c_note, c_source, t_input], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Category added successfully', id: this.lastID });
    });
};

exports.get_output_by_id = (req, res) => {
    const { c_id } = req.params;
    const sql = `SELECT * FROM t_output WHERE c_id = ?`;
    db.get(sql, [c_id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Output not found' });
        res.json(row);
    });
};

exports.update_output = (req, res) => {
    const { c_id } = req.params;
    const { c_output, c_total_duration, c_token, c_score, c_note, c_source, t_input } = req.body;
    const sql = `UPDATE t_output SET c_output = ?, c_total_duration = ?, c_token = ?, c_score = ?, c_note = ?, c_source = ?, t_input = ? WHERE c_id = ?`;
    db.run(sql, [c_output, c_total_duration, c_token, c_score, c_note, c_source, t_input, c_id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Output not found' });
        res.json({ message: 'Output updated successfully' });
    });
};

exports.delete_output = (req, res) => {
    const { c_id } = req.params;
    const sql = `DELETE FROM t_output WHERE c_id = ?`;
    db.run(sql, [c_id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: `ID ${c_id} not found` });
        res.json({ message: 'Output deleted successfully' });
    });
};