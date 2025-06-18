const db = require('../utils/database');

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  const sql = `INSERT INTO users (name, email) VALUES (?, ?)`;
  db.run(sql, [name, email], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'User added successfully', id: this.lastID });
  });
};

exports.getAllUsers = (req, res) => {
  const sql = `SELECT * FROM users`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM users WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.json(row);
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
  db.run(sql, [name, email, id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated successfully' });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE id = ?`;
  db.run(sql, [id], function(err) {
    if (err) return res.status(400).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  });
};