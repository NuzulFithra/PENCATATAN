# Deployment Guide - Pencatatan Pengeluaran Web

Complete guide to deploy this web app to Vercel (free).

## Prerequisites

- GitHub account (free at github.com)
- Vercel account (free at vercel.com)
- Git installed on your computer

## Step 1: Prepare Local Repository

```bash
# Initialize git in project folder
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Pencatatan Pengeluaran web app"
```

## Step 2: Push to GitHub

### Create Repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `pencatatan-pengeluaran-web`
3. Description: "Web app for expense tracking"
4. Choose: Public or Private
5. Click "Create repository"

### Push Code

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/pencatatan-pengeluaran-web.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Method 1: Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Import Git Repository"
5. Find `pencatatan-pengeluaran-web`
6. Click Import
7. Configure:
   - Framework: Node.js
   - Root Directory: `.` (leave default)
8. Click "Deploy"
9. **Wait 1-2 minutes for deployment**
10. ✓ Your app is LIVE!

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Answer prompts:
# Which scope? → Your username
# Link to existing? → No
# Project name? → pencatatan-pengeluaran-web
# Directory? → ./
```

## Step 4: Access Your App

After deployment, Vercel will give you a URL like:
```
https://pencatatan-pengeluaran-web.vercel.app
```

Open it in browser and test!

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records (Vercel will show instructions)

## Environment Variables (If Needed)

1. Go to Vercel Project Settings
2. Click "Environment Variables"
3. Add your variables:
   - `PORT=3000`
   - `NODE_ENV=production`
   - `DATABASE_URL=` (if using database)

## Automatic Deployments

After initial setup:
- Every push to `main` branch → Auto deploys to Vercel
- No manual steps needed
- Live in seconds!

## Rollback to Previous Version

1. Go to Vercel Project
2. Click "Deployments"
3. Find previous version
4. Click "..." menu
5. Select "Promote to Production"

## Monitoring & Logs

1. Vercel Project Dashboard
2. Click "Deployments"
3. Select any deployment
4. View real-time logs

## Troubleshooting Deployment

### Build Failed
- Check `vercel.json` format
- Verify `api/index.js` has no syntax errors
- Check `package.json` dependencies

### 404 Errors
- Ensure static files are in `public/` folder
- Check file paths in HTML

### API Not Working
- Verify CORS configuration
- Check base URL in `public/js/app.js`

### Port Issues
- Vercel auto-assigns ports, no manual config needed

## Free Tier Limits

- Serverless functions: 12 requests/second
- Bandwidth: 100GB/month
- Storage: Limited
- **Perfect for personal use!**

## Next Steps

1. ✓ Deploy to Vercel
2. Share your URL with others
3. Add database (Supabase) for persistence
4. Add authentication
5. Customize styling
6. Add more features

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- GitHub Docs: [docs.github.com](https://docs.github.com)
- Express Docs: [expressjs.com](https://expressjs.com)

---

**Congratulations! Your app is now on the internet!** 🎉
