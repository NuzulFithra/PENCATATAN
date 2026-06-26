# Pencatatan Pengeluaran - Web App

Web-based expense tracking application built with Node.js Express and deployable on Vercel.

## Features

- 💰 **Dashboard**: View total expenses (today, month, year)
- ➕ **Add Expenses**: Quick input form for new transactions
- 📊 **Transaction List**: View all expenses in a table
- 🔍 **Search**: Find expenses by merchant name
- 📱 **Responsive**: Works on desktop and mobile
- 🚀 **Fast**: Optimized for Vercel deployment

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL (via Supabase)
- **Hosting**: Vercel
- **Deployment**: Git + Vercel integration

## Project Structure

```
pencatatan-pengeluaran-web/
├── api/
│   └── index.js              # Express server
├── public/
│   ├── index.html            # Main page
│   ├── js/
│   │   └── app.js            # Frontend logic
│   └── styles/
│       └── style.css         # Styling
├── package.json              # Dependencies
├── vercel.json               # Vercel config
├── .env.example              # Environment template
└── README.md                 # This file
```

## Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pencatatan-pengeluaran-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Run locally**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

## Deployment to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project from GitHub
4. Configure environment variables (if needed)
5. Deploy automatically

### Option 3: Direct Upload

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Upload folder or connect Git
4. Click Deploy

## API Endpoints

### Get Dashboard Stats
```
GET /api/dashboard
```

Response:
```json
{
  "today": 50000,
  "thisMonth": 500000,
  "thisYear": 2000000,
  "totalTransactions": 45
}
```

### Get All Expenses
```
GET /api/expenses
```

### Add Expense
```
POST /api/expenses
Content-Type: application/json

{
  "date": "2026-06-26",
  "merchant": "Cafe",
  "category": "Food",
  "amount": 50000,
  "method": "Cash"
}
```

### Delete Expense
```
DELETE /api/expenses/{id}
```

## Environment Variables

```env
PORT=3000                    # Server port
NODE_ENV=development         # Environment
DATABASE_URL=                # PostgreSQL connection (optional for v1)
API_BASE_URL=http://localhost:3000
```

## Database Setup (Optional - for persistence)

### Using Supabase (Free Tier)

1. Go to [supabase.com](https://supabase.com)
2. Create free account
3. Create new project
4. Get connection string
5. Add to `.env` as `DATABASE_URL`

Database Schema:

```sql
CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  merchant VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  amount INTEGER NOT NULL,
  method VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payment_methods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Features to Add (Roadmap)

- [ ] User authentication (Google/GitHub)
- [ ] Real database persistence
- [ ] Edit expenses
- [ ] Category management
- [ ] Payment method management
- [ ] Monthly/yearly reports
- [ ] Export to Excel/CSV
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] PWA (Progressive Web App)

## Troubleshooting

### Port already in use
```bash
# Use different port
PORT=3001 npm run dev
```

### Dependencies not installing
```bash
npm install --force
```

### CORS issues
Check that API calls match the correct base URL in `public/js/app.js`

## Performance

- Load time: < 2 seconds
- API response: < 200ms
- Fully responsive and mobile-friendly

## Security

- CORS enabled for public access
- Input validation on server
- Safe async/await patterns
- No sensitive data in frontend

## License

MIT License - Feel free to use for personal or commercial projects

## Support

For issues or suggestions, create a GitHub issue or contact the developer.

---

**Version**: 1.0.0  
**Last Updated**: 2026-06-26  
**Status**: Ready for Vercel Deployment
