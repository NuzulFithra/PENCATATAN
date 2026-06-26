const { getSupabase } = require('../lib/db');

class ExpenseService {
  async getAllExpenses() {
    const supabase = getSupabase();
    
    if (!supabase) {
      return [
        { id: 1, date: '2026-06-26', merchant: 'Cafe Lezat', category: 'Makanan', amount: 50000, payment_method: 'Cash' },
        { id: 2, date: '2026-06-26', merchant: 'Gojek', category: 'Transport', amount: 30000, payment_method: 'E-Wallet' },
        { id: 3, date: '2026-06-25', merchant: 'Bioskop', category: 'Hiburan', amount: 75000, payment_method: 'Card' }
      ];
    }

    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching expenses:', error);
      return [];
    }
  }

  async addExpense(expenseData) {
    const supabase = getSupabase();

    if (!supabase) {
      return { id: Math.floor(Math.random() * 1000), ...expenseData };
    }

    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert([expenseData])
        .select();

      if (error) throw error;
      return data?.[0] || expenseData;
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  }

  async deleteExpense(id) {
    const supabase = getSupabase();

    if (!supabase) {
      return { success: true };
    }

    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  }

  async getDashboardStats() {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    const yearStart = new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0];

    if (!supabase) {
      return { today: 50000, thisMonth: 500000, thisYear: 2000000, totalTransactions: 3 };
    }

    try {
      const { data: todayData } = await supabase
        .from('expenses')
        .select('amount')
        .eq('date', today);

      const { data: monthData } = await supabase
        .from('expenses')
        .select('amount')
        .gte('date', monthStart)
        .lte('date', today);

      const { data: yearData } = await supabase
        .from('expenses')
        .select('amount')
        .gte('date', yearStart)
        .lte('date', today);

      const { count } = await supabase
        .from('expenses')
        .select('*', { count: 'exact' });

      const todayTotal = todayData?.reduce((sum, e) => sum + e.amount, 0) || 0;
      const monthTotal = monthData?.reduce((sum, e) => sum + e.amount, 0) || 0;
      const yearTotal = yearData?.reduce((sum, e) => sum + e.amount, 0) || 0;

      return {
        today: todayTotal,
        thisMonth: monthTotal,
        thisYear: yearTotal,
        totalTransactions: count || 0
      };
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      return { today: 0, thisMonth: 0, thisYear: 0, totalTransactions: 0 };
    }
  }
}

module.exports = new ExpenseService();
