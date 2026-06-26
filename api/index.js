const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const db = require('../lib/db');
const expenseService = require('../services/expenseService');
const { initializeSupabase } = require('./lib/db');

// Initialize Supabase on startup
initializeSupabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pencatatan Pengeluaran API running' });
});

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    res.json({ data: expenses, total });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Add new expense
app.post('/api/expenses', async (req, res) => {
  try {
    const { date, merchant, category, amount, payment_method } = req.body;
    
    // Validation
    if (!date || !merchant || !category || !amount || !payment_method) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const expense = await expenseService.addExpense({
      date,
      merchant,
      category,
      amount: parseInt(amount),
      payment_method,
      description: req.body.description || ''
    });

    res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      data: expense
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

// Delete expense
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await expenseService.deleteExpense(id);
    res.json({ success: true, message: `Expense deleted` });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// Get dashboard stats
app.get('/api/dashboard', async (req, res) => {
  try {
    const stats = await expenseService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
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
