# NutriVeda Deployment Guide

This guide explains how to deploy the NutriVeda application to production environments like Render and Vercel.

## 🚀 Backend Deployment (Render)

The backend is configured to be deployed as a Web Service on Render.

### 1. Prerequisite
- A MongoDB Atlas cluster.
- A Google Gemini AI API Key.

### 2. Steps to Deploy
1. **Connect Repository**: In the Render Dashboard, click **New +** -> **Web Service** and connect this repository.
2. **Environment**: Select **Node** as the runtime.
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. **Environment Variables**:
   Add the following variables in the Render dashboard:
   - `PORT`: `10000` (or leave default)
   - `MONGODB_URI`: `your_mongodb_atlas_connection_string`
   - `GEMINI_API_KEY`: `your_gemini_api_key_here`

### 3. Health Check
Once deployed, you can verify the backend status at:
`https://your-app-name.onrender.com/api/health`

---

## 💻 Frontend Deployment (Vercel)

The frontend is optimized for Vercel.

### 1. Steps to Deploy
1. **Import Project**: In Vercel, import this repository.
2. **Vercel Configuration**: The root `vercel.json` handles the build process automatically.
3. **Environment Variables**:
   Add the following variables in the Vercel dashboard:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com`

---

## 🛡️ Security Best Practices

> [!IMPORTANT]
> **API Key Rotation**: If you suspect your API keys have been leaked (e.g., you received a GitHub secret scanning notification), you **must** rotate them immediately.

1. **Rotate Keys**: Go to the Google Cloud Console / AI Studio and revoke the old key, then generate a new one.
2. **Update Environment**: Update the `GEMINI_API_KEY` in your Render environment variables.
3. **Check .gitignore**: Ensure that `.env` files are never tracked by Git. The current root `.gitignore` is already configured for this.
4. **History Scrubbing**: If you need to remove a secret from your Git history entirely, consider using tools like `git-filter-repo` or `BFG Repo-Cleaner`.

---

## 📄 Monitoring

Run the local security check script before any major commit:
```bash
bash security-check.sh
```
