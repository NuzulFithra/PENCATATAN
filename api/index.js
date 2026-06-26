const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

const { initializeSupabase } = require('../lib/db');
const expenseService = require('../services/expenseService');

// Initialize Supabase
initializeSupabase();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Pencatatan Pengeluaran API running'
  });
});

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await expenseService.getAllExpenses();
    const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

    res.json({
      data: expenses,
      total
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to fetch expenses'
    });
  }
});

// Add expense
app.post('/api/expenses', async (req, res) => {
  try {
    const {
      date,
      merchant,
      category,
      amount,
      payment_method,
      description
    } = req.body;

    if (!date || !merchant || !category || !amount || !payment_method) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    const expense = await expenseService.addExpense({
      date,
      merchant,
      category,
      amount: Number(amount),
      payment_method,
      description: description || ''
    });

    res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      data: expense
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to add expense'
    });
  }
});

// Delete expense
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    await expenseService.deleteExpense(req.params.id);

    res.json({
      success: true,
      message: 'Expense deleted'
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to delete expense'
    });
  }
});

// Dashboard
app.get('/api/dashboard', async (req, res) => {
  try {
    const stats = await expenseService.getDashboardStats();

    res.json(stats);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to fetch dashboard stats'
    });
  }
});

// Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: 'Internal Server Error'
  });
});

// Local development only
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
