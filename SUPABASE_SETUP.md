# Supabase Database Setup Guide

Complete guide to setup PostgreSQL database for Pencatatan Pengeluaran web app.

## What is Supabase?

Supabase is an open-source Firebase alternative with PostgreSQL database. Free tier includes:
- 500MB storage
- Unlimited API requests
- Real-time database
- Perfect for small projects

## Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create organization (use any name)

## Step 2: Create New Project

1. Click "New project"
2. Project name: `pencatatan-pengeluaran`
3. Database password: Create strong password (save it!)
4. Region: Choose closest to you (e.g., Singapore)
5. Click "Create new project"
6. **Wait 2-3 minutes** for project to initialize

## Step 3: Get Your Credentials

1. Go to Project Settings (gear icon)
2. Click "API" in left menu
3. Copy these values:
   - **Project URL** → SUPABASE_URL
   - **anon public** → SUPABASE_ANON_KEY

Example:
```
SUPABASE_URL=https://xyzabc.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Run Database Schema

1. Go to SQL Editor (in left menu)
2. Click "New query"
3. Copy-paste content from `database-schema.sql`
4. Click "Run"
5. ✓ Tables created!

## Step 5: Configure Environment Variables

### Local Development

1. Create `.env` file (copy from `.env.example`)
2. Add your Supabase credentials:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Vercel Deployment

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add two variables:
   - Key: `SUPABASE_URL` → Value: your URL
   - Key: `SUPABASE_ANON_KEY` → Value: your key
4. Redeploy

## Step 6: Test Connection

Run locally:
```bash
npm run dev
```

Open browser and go to:
- http://localhost:3000/api/health
- Should return: `{"status":"ok"...}`

## Step 7: Test Adding Data

1. Open app: http://localhost:3000
2. Add new expense
3. Go to Supabase dashboard → SQL Editor
4. Run: `SELECT * FROM expenses;`
5. Should see your new expense!

## Useful Supabase URLs

- **Supabase Dashboard**: https://app.supabase.com
- **Project Settings**: Click gear icon
- **SQL Editor**: Left menu
- **Database**: View tables and data
- **Realtime**: Enable for live updates

## Common Issues

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### "Supabase not configured. Using dummy data."
- Check `.env` file exists
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set
- Restart server: `npm run dev`

### "Authentication required" error
- Check your SUPABASE_ANON_KEY is correct
- Make sure Row Level Security is not blocking access

### Can't connect to database
- Verify internet connection
- Check Supabase project is active
- Check credentials in `.env`

## Next Steps

1. ✓ Create account
2. ✓ Create project
3. ✓ Get credentials
4. ✓ Run SQL schema
5. ✓ Add to `.env`
6. Test locally
7. Deploy to Vercel

## Security Notes

- **NEVER commit `.env`** file to Git (it's in `.gitignore`)
- Use environment variables in production
- Supabase free tier has RLS (Row Level Security) available
- Consider adding authentication later

## Pricing

**Free Tier** (Always free):
- 500 MB storage
- Unlimited API calls
- 2 concurrent connections
- 7 days backup
- Perfect for development!

**Pro Tier** ($25/month):
- 8 GB storage
- More connections
- Better SLAs
- Email support

Start with Free, upgrade when you need more!

---

**Status**: Ready to setup
**Next**: Follow steps 1-7 above
**Time Required**: ~10 minutes
