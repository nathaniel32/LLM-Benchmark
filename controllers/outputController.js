const db = require('../utils/database');

exports.create_output = (req, res) => { 
    const { c_output_think, c_output_final, c_total_duration, c_load_duration, c_prompt_eval_count, c_prompt_eval_duration, c_eval_count, c_eval_duration, c_score, c_note, t_input_id, t_model_id } = req.body;
    const sql = `INSERT INTO t_output (
                    c_output_think,
                    c_output_final,
                    c_total_duration,
                    c_load_duration,
                    c_prompt_eval_count,
                    c_prompt_eval_duration,
                    c_eval_count,
                    c_eval_duration,
                    c_score,
                    c_note,
                    t_input_id,
                    t_model_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [c_output_think.trim() || null, c_output_final.trim() || null, c_total_duration, c_load_duration, c_prompt_eval_count, c_prompt_eval_duration, c_eval_count, c_eval_duration, c_score, c_note.trim() || null, t_input_id, t_model_id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: 'Output added successfully', id: this.lastID });
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