const db = require('../db');

// Admin: Create Invoice
exports.createInvoice = (req, res) => {
  const { title, amount, created_by } = req.body;

  if (created_by !== 'admin') {
    return res.status(403).json({ message: 'Only admin can create invoice' });
  }

  const sql = 'INSERT INTO invoices (title, amount, created_by) VALUES (?, ?, ?)';
  db.query(sql, [title, amount, created_by], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Invoice created successfully' });
  });
};

// Agent/Admin: View All Invoices
exports.getAllInvoices = (req, res) => {
  db.query('SELECT * FROM invoices', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};
