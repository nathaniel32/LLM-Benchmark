const db = require('../utils/database');

exports.get_all_inputs = (req, res) => {
    const sql = `SELECT * FROM t_input`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

/* exports.create_input = (req, res) => { 
    const { c_input, c_rule, c_temperature, c_note, t_category_id } = req.body;
    const sql = `INSERT INTO t_input (c_input, c_rule, c_temperature, c_note, t_category_id) VALUES (?, ?, ?, ?, ?)`;
    const input_trimmed = c_input ? c_input.trim() : null;
    const rule_trimmed = c_rule ? c_rule.trim() : null;
    const note_trimmed = c_note ? c_note.trim() : null;
    db.run(sql, [input_trimmed, rule_trimmed, c_temperature, note_trimmed, t_category_id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Input added successfully', id: this.lastID });
    });
};
 */

/* exports.delete_input = (req, res) => {
    const { c_id } = req.params;
    const sql = `DELETE FROM t_input WHERE c_id = ?`;
    db.run(sql, [c_id], function(err) {
        if (err) return res.status(400).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: `ID ${c_id} not found` });
        res.json({ message: 'Input deleted successfully' });
    });
}; */

function deleteInputById(c_id, callback) {
    db.serialize(() => {
        db.run("BEGIN TRANSACTION");
        db.run(`DELETE FROM t_output WHERE t_input_id = ?`, [c_id], function(err) {
            if (err) {
                db.run("ROLLBACK");
                return callback(err);
            }
            db.run(`DELETE FROM t_input WHERE c_id = ?`, [c_id], function(err) {
                if (err) {
                    db.run("ROLLBACK");
                    return callback(err);
                }
                if (this.changes === 0) {
                    db.run("ROLLBACK");
                    return callback(new Error(`ID ${c_id} not found`));
                }
                db.run("COMMIT");
                callback(null);
            });
        });
    });
}

exports.create_input = (req, res) => {
    const { c_input, c_rule, c_temperature, c_note, t_category_id } = req.body;
    const input_trimmed = c_input ? c_input.trim() : null;
    const rule_trimmed = c_rule ? c_rule.trim() : null;
    const note_trimmed = c_note ? c_note.trim() : null;

    if (!input_trimmed) {
        return res.status(400).json({ error: 'c_input is required' });
    }

    db.get(`SELECT c_id FROM t_input WHERE c_input = ?`, [input_trimmed], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const insertInput = () => {
            const sqlInsert = `
                INSERT INTO t_input (c_input, c_rule, c_temperature, c_note, t_category_id)
                VALUES (?, ?, ?, ?, ?)
            `;
            db.run(sqlInsert, [input_trimmed, rule_trimmed, c_temperature, note_trimmed, t_category_id], function(err) {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }
                res.json({ message: 'Input added successfully', id: this.lastID });
            });
        };

        if (row) {
            deleteInputById(row.c_id, (err) => {
                if (err) {
                    if (err.message.includes('not found')) {
                        insertInput();
                    } else {
                        return res.status(500).json({ error: err.message });
                    }
                } else {
                    insertInput();
                }
            });
        } else {
            insertInput();
        }
    });
};

exports.delete_input = (req, res) => {
    const { c_id } = req.params;
    deleteInputById(c_id, (err) => {
        if (err) {
            if (err.message.includes('not found')) {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Input and related outputs deleted successfully' });
    });
};