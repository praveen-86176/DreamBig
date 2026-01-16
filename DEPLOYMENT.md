# NutriVeda Backend Deployment Guide

## Deploying to Render

### Option 1: Using render.yaml (Recommended)

1. **Push to GitHub** (already done ✅)

2. **Create New Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `praveen-86176/DreamBig`

3. **Configure Service**
   - **Name**: `nutriveda-backend`
   - **Region**: Choose closest to you
   - **Branch**: `master`
   - **Root Directory**: Leave empty (uses root)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables**
   Add these in Render dashboard:
   ```
   PORT=5001
   GEMINI_API_KEY=your_actual_api_key_here
   MONGODB_URI=your_mongodb_connection_string
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy

### Option 2: Manual Configuration

If render.yaml doesn't work, use these settings:

**Build Settings:**
- Build Command: `cd backend && npm install`
- Start Command: `cd backend && npm start`

**Environment Variables:**
```
PORT=10000
NODE_ENV=production
GEMINI_API_KEY=AIzaSyBmyOI1WrhITKOfuY8xb9nrehYEFO9YHZE
MONGODB_URI=mongodb+srv://your-connection-string
```

### Important Notes:

1. **Port**: Render assigns a dynamic port via `process.env.PORT`
2. **MongoDB**: Use MongoDB Atlas (free tier) for production
3. **API Key**: Add your Gemini API key in Render environment variables
4. **CORS**: Update frontend to use your Render backend URL

### After Deployment:

1. **Get your backend URL**: `https://nutriveda-backend.onrender.com`
2. **Update frontend**: Change API URLs from `localhost:5001` to your Render URL
3. **Test health endpoint**: Visit `https://your-app.onrender.com/api/health`

### MongoDB Atlas Setup (Free):

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist all IPs (0.0.0.0/0) for Render
5. Get connection string
6. Add to Render environment variables

### Troubleshooting:

- **Build fails**: Check build logs in Render dashboard
- **App crashes**: Check runtime logs
- **CORS errors**: Update CORS origin in backend to include Render URL
- **MongoDB connection**: Verify connection string and IP whitelist

---

Your backend will be live at: `https://nutriveda-backend.onrender.com` 🚀
