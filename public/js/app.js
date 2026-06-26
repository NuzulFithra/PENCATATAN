// API Base URL
const API_BASE = window.location.origin + '/api';

// DOM Elements
const expenseForm = document.getElementById('expenseForm');
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('search');

// Set today's date as default
document.getElementById('date').valueAsDate = new Date();

// Load initial data
document.addEventListener('DOMContentLoaded', async () => {
    await loadDashboard();
    await loadExpenses();
});

// Format currency to Rupiah
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Load dashboard stats
async function loadDashboard() {
    try {
        const response = await fetch(`${API_BASE}/dashboard`);
        const data = await response.json();
        
        document.getElementById('todayTotal').textContent = formatCurrency(data.today);
        document.getElementById('monthTotal').textContent = formatCurrency(data.thisMonth);
        document.getElementById('yearTotal').textContent = formatCurrency(data.thisYear);
        document.getElementById('totalTransactions').textContent = data.totalTransactions;
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// Load expenses list
async function loadExpenses() {
    try {
        const response = await fetch(`${API_BASE}/expenses`);
        const result = await response.json();
        
        tableBody.innerHTML = '';
        
        if (result.data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center">Tidak ada data</td></tr>';
            return;
        }
        
        result.data.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.date}</td>
                <td>${expense.merchant}</td>
                <td>${expense.category}</td>
                <td>${formatCurrency(expense.amount)}</td>
                <td>${expense.method}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteExpense(${expense.id})">Hapus</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading expenses:', error);
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center">Error loading data</td></tr>';
    }
}

// Add expense
expenseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const expense = {
        date: document.getElementById('date').value,
        merchant: document.getElementById('merchant').value,
        category: document.getElementById('category').value,
        amount: parseInt(document.getElementById('amount').value),
        method: document.getElementById('method').value
    };
    
    try {
        const response = await fetch(`${API_BASE}/expenses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expense)
        });
        
        if (response.ok) {
            alert('Pengeluaran berhasil ditambahkan!');
            expenseForm.reset();
            document.getElementById('date').valueAsDate = new Date();
            await loadExpenses();
            await loadDashboard();
        }
    } catch (error) {
        console.error('Error adding expense:', error);
        alert('Error menambahkan pengeluaran');
    }
});

// Delete expense
async function deleteExpense(id) {
    if (confirm('Hapus pengeluaran ini?')) {
        try {
            const response = await fetch(`${API_BASE}/expenses/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                alert('Pengeluaran dihapus!');
                await loadExpenses();
                await loadDashboard();
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    }
}

// Search functionality
searchInput.addEventListener('keyup', async (e) => {
    const query = e.target.value.toLowerCase();
    const rows = tableBody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const merchant = row.cells[1]?.textContent.toLowerCase() || '';
        row.style.display = merchant.includes(query) ? '' : 'none';
    });
});

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        
        const sectionId = e.target.getAttribute('href');
        document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
        document.querySelector(sectionId).style.display = 'block';
    });
});
