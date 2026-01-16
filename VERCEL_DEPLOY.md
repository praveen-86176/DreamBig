# NutriVeda - Vercel Deployment Guide

## 🚀 Deploy Frontend to Vercel

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "feat: Configure for Vercel deployment"
git push origin master
```

### Step 2: Deploy on Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/new

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import from GitHub: `praveen-86176/DreamBig`

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables**
   Add in Vercel dashboard:
   ```
   VITE_API_URL=https://dreambig.onrender.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Step 3: Update Backend CORS (if needed)

Your backend already allows Vercel domains (`.vercel.app`), so no changes needed!

### Alternative: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set root directory: ./
# - Override settings: No
# - Deploy to production: Yes
```

### After Deployment

Your app will be live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://dreambig.onrender.com`

### Testing

1. Visit your Vercel URL
2. Upload a food image
3. Check if analysis works
4. Verify history/activity feature

### Troubleshooting

**CORS Errors:**
- Backend already configured for `.vercel.app` domains ✅

**API Connection Failed:**
- Check `VITE_API_URL` in Vercel environment variables
- Verify backend is running: https://dreambig.onrender.com/api/health

**Build Fails:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`

---

## 🎯 Quick Deploy Checklist

- ✅ Backend deployed on Render
- ✅ Frontend configured with environment variables
- ✅ CORS configured for Vercel
- ✅ API URLs use environment variables
- ✅ Ready to deploy on Vercel!

**Your backend**: https://dreambig.onrender.com
**Deploy frontend**: https://vercel.com/new
