# PENCATATAN PENGELUARAN - QUICK REFERENCE GUIDE

## 🚀 3-MINUTE DEPLOYMENT

### Prerequisites
- GitHub account (free)
- Vercel account (free, sign with GitHub)
- ~5 minutes of time

### Step 1: GitHub
\\\ash
# From project folder:
git remote add origin https://github.com/YOUR_USERNAME/pencatatan-pengeluaran-web.git
git branch -M main
git push -u origin main
\\\

### Step 2: Vercel
1. Go to vercel.com
2. Click "New Project"
3. Select your repository
4. Click "Deploy"
5. ✅ Live at: https://pencatatan-pengeluaran-web.vercel.app

---

## 💻 LOCAL DEVELOPMENT

### Install & Run
\\\ash
npm install
npm run dev
# Open http://localhost:3000
\\\

### Project Structure
\\\
api/index.js           ← Backend server
public/index.html      ← Frontend UI
public/js/app.js       ← Frontend logic
lib/db.js              ← Database connection
services/              ← Business logic
styles/                ← CSS styling
\\\

---

## 🌐 API ENDPOINTS

### Health Check
\\\
GET /api/health
Response: {"status":"ok","message":"..."}
\\\

### Get Dashboard Stats
\\\
GET /api/dashboard
Response: {"today":50000,"thisMonth":500000,"thisYear":2000000,"totalTransactions":45}
\\\

### Get All Expenses
\\\
GET /api/expenses
Response: {"data":[...], "total":155000}
\\\

### Add Expense
\\\
POST /api/expenses
Body: {
  "date":"2026-06-26",
  "merchant":"Cafe",
  "category":"Makanan",
  "amount":50000,
  "payment_method":"Cash"
}
Response: {"success":true,"data":{...}}
\\\

### Delete Expense
\\\
DELETE /api/expenses/{id}
Response: {"success":true}
\\\

---

## 🗄️ DATABASE SETUP (Optional)

### Supabase Setup
1. Go to supabase.com
2. Create new project
3. Copy URL and API key
4. Get from: Settings → API → anon key

### Add to Environment
Create \.env\ file:
\\\env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
\\\

### Run Schema
1. Supabase Dashboard → SQL Editor
2. Create new query
3. Paste content from database-schema.sql
4. Click Run

### Add to Vercel
1. Project Settings → Environment Variables
2. Add SUPABASE_URL
3. Add SUPABASE_ANON_KEY
4. Redeploy

---

## 🎨 CUSTOMIZATION

### Change Colors
Edit: \styles/style.css\
Search: \#667eea\ or \#764ba2\ (gradient colors)

### Change App Name
Edit: \public/index.html\
Search: "💰 Pencatatan Pengeluaran"

### Add New Category
Edit: \database-schema.sql\ or add via UI

### Add New API Endpoint
Edit: \pi/index.js\
Add new route: \pp.get('/api/...')\

---

## 🐛 TROUBLESHOOTING

### "Cannot find module"
\\\ash
npm install
\\\

### Port already in use
\\\ash
PORT=3001 npm run dev
\\\

### Database not connecting
Check .env file has correct credentials

### API not responding
Check vercel.json build config

### Frontend shows no data
Check browser console (F12) for errors

---

## 📊 PROJECT STATS

| Metric | Value |
|--------|-------|
| Files | 16 |
| Size | 31.8 KB |
| Code Lines | 1000+ |
| APIs | 5 |
| Tables | 3 |
| Dependencies | 4 (express, cors, dotenv, supabase) |

---

## 🔐 SECURITY NOTES

- Use .env for secrets (never commit)
- Parameterized queries in database
- CORS enabled for cross-origin
- Input validation on all endpoints
- No sensitive data in frontend

---

## 📱 FEATURES

✓ Dashboard with analytics
✓ Add/Search/Delete expenses
✓ Mobile responsive
✓ Professional UI
✓ Real-time updates
✓ Automatic calculations
✓ Currency formatting (Rupiah)

---

## 🎯 COMMON WORKFLOWS

### Add New Expense (Frontend)
1. Fill form → Click "Simpan"
2. POST to /api/expenses
3. Dashboard updates
4. Table refreshes

### View All Expenses
1. GET /api/expenses
2. Display in table
3. Calculate total
4. Show in dashboard

### Delete Expense
1. Click "Hapus" button
2. Confirm dialog
3. DELETE /api/expenses/{id}
4. Refresh table

### Search Expenses
1. Type in search box
2. Client-side filter
3. Show matching rows

---

## 📚 NEXT STEPS AFTER DEPLOYMENT

1. ✅ Share URL with users
2. ✅ Test with real data
3. ✅ Add Supabase for persistence
4. ✅ Setup custom domain (optional)
5. ✅ Add authentication (v1.1)
6. ✅ Add more features (v1.2)

---

## 💡 PRO TIPS

- Works without database! Deploy first, add DB later
- Every push to main = auto deploy on Vercel
- Use Supabase free tier for development
- Can scale to millions of records
- Mobile app can use same API

---

## 🆘 GET HELP

- Check README.md
- Read DEPLOYMENT.md
- See SUPABASE_SETUP.md
- Review error logs in browser console
- Check Vercel deployment logs

---

**Last Updated**: 2026-06-26
**Status**: Production Ready
**Version**: 1.0.0
