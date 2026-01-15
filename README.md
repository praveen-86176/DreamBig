# 🥑 NutriAI - AI Nutrition Assistant

A full-stack AI-powered nutrition assistant that analyzes your food photos and provides health insights using Gemini Vision.

## 🚀 Features

- **Food Recognition**: Identifies food items from images.
- **Health Analysis**: Classifies meals as Healthy, Moderate, or Unhealthy.
- **Dietary Advice**: Provides explanations and recommendations for your next meal.
- **Premium UI**: Modern, responsive, and vibrant interface using React + Tailwind.

## 🛠 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, Multer
- **AI**: Google Gemini (generative-ai)
- **Database**: MongoDB

## 📦 Setup & Installation

### Prerequisities
- Node.js installed
- MongoDB installed and running locally (or a cloud URI)
- Google Cloud API Key with Gemini API access

### 1. Backend Setup

```bash
cd backend
npm install
```

**Configuration:**
Create a `.env` file in the `backend` folder (or edit the existing one):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nutrition-assistant
GEMINI_API_KEY=YOUR_ACTIAL_API_KEY_HERE
```

**Run Server:**
```bash
npm run dev
# or
node server.js
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:5173`.

## 📸 Usage

1. Start both Backend and Frontend.
2. Open the Frontend URL.
3. Upload a food image.
4. Wait for the AI analysis and view your results!

## 🧪 Deployment

- **Frontend**: Ready for deployment on Vercel/Netlify.
- **Backend**: Ready for Render/Fly.io. Ensure environment variables are set in the dashboard.

---
Built with ❤️ by Praveen Kumar
