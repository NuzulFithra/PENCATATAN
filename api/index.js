const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pencatatan Pengeluaran API running' });
});

// Dummy expenses endpoint (will connect to DB later)
app.get('/api/expenses', (req, res) => {
  res.json({
    data: [
      { id: 1, date: '2026-06-26', merchant: 'Cafe Lezat', category: 'Makanan', amount: 50000, method: 'Cash' },
      { id: 2, date: '2026-06-26', merchant: 'Gojek', category: 'Transport', amount: 30000, method: 'E-Wallet' },
      { id: 3, date: '2026-06-25', merchant: 'Bioskop', category: 'Hiburan', amount: 75000, method: 'Card' }
    ],
    total: 155000
  });
});

// Add expense
app.post('/api/expenses', (req, res) => {
  const { date, merchant, category, amount, method } = req.body;
  
  // Validation
  if (!date || !merchant || !category || !amount || !method) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  res.status(201).json({
    success: true,
    message: 'Expense added successfully',
    data: { id: Math.floor(Math.random() * 1000), date, merchant, category, amount, method }
  });
});

// Delete expense
app.delete('/api/expenses/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    success: true,
    message: `Expense ${id} deleted`
  });
});

// Get dashboard stats
app.get('/api/dashboard', (req, res) => {
  res.json({
    today: 50000,
    thisMonth: 500000,
    thisYear: 2000000,
    totalTransactions: 45
  });
});

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Pencatatan Pengeluaran API running on port ${PORT}`);
  console.log(`✓ Open http://localhost:${PORT} in browser`);
});

module.exports = app;
