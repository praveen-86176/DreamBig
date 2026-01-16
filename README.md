# 🥗 NutriVeda - AI Nutrition Assistant

[![Backend](https://img.shields.io/badge/Backend-Live-success)](https://dreambig.onrender.com)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel-blue)](https://dream-big-4hri.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

> AI-powered food analysis with instant nutritional insights using Google Gemini Vision AI

## ✨ Features

- 📸 **Instant Analysis** - Upload or capture food images
- 🤖 **AI-Powered** - Google Gemini Vision for accurate recognition
- 📊 **Detailed Insights** - Macros, micros, calories, ingredients
- 🏷️ **Smart Categorization** - Healthy, Balanced, or Indulgent
- ⚠️ **Health Warnings** - Allergens, sodium, processed foods
- 🎯 **Dietary Tags** - Vegan, High-protein, Gluten-free, etc.
- 🍳 **Cooking Method** - Detection and display
- 📱 **Responsive** - Works on all devices
- 🌓 **Dark Mode** - Eye-friendly interface
- 📜 **History** - Track your meals

## 🚀 Live Demo

- **Frontend**: https://dream-big-4hri.vercel.app
- **Backend API**: https://dreambig.onrender.com

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS v4
- Recharts for visualization
- Lucide React icons
- react-webcam

### Backend
- Node.js with Express
- Google Gemini AI API
- Multer for file uploads
- MongoDB (optional)
- CORS configured

## 📋 Prerequisites

- Node.js >= 18.0.0
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))
- npm or yarn

## 🏃 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/praveen-86176/DreamBig.git
cd DreamBig
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
npm start
```

Backend runs on: `http://localhost:5001`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5001
GEMINI_API_KEY=your_api_key_here
MONGODB_URI=mongodb://localhost:27017/nutrition-assistant
```

### Frontend (.env.development)
```env
VITE_API_URL=http://localhost:5001
```

### Frontend (.env.production)
```env
VITE_API_URL=https://dreambig.onrender.com
```

## 📦 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create Web Service on Render
3. Connect repository
4. Add environment variables
5. Deploy

See `deploy-check.sh` for detailed steps.

### Frontend (Vercel)
1. Import project from GitHub
2. Set root directory: `frontend`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL`
5. Deploy

## 🎯 API Endpoints

```
GET  /                      - API information
GET  /api/health           - Health check
POST /api/analyze          - Analyze food image
GET  /api/analyze/history  - Get meal history
```

## 🧪 Testing

```bash
# Run security check
./security-check.sh

# Run deployment check
./deploy-check.sh
```

## 📁 Project Structure

```
DreamBig/
├── backend/
│   ├── server.js          # Express server
│   ├── .env.example       # Environment template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main component
│   │   └── index.css      # Tailwind styles
│   ├── public/            # Static assets
│   └── package.json
├── package.json           # Root package (Render)
├── vercel.json           # Vercel config
├── render.yaml           # Render config
└── README.md
```

## 🔒 Security

- ✅ API keys in environment variables
- ✅ `.env` files ignored by git
- ✅ CORS configured for production
- ✅ File size limits (10MB)
- ✅ Image type validation
- ✅ Security check script

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or production.

## 🙏 Acknowledgments

- Google Gemini AI for powerful image analysis
- Tailwind CSS for beautiful styling
- Recharts for data visualization
- Vercel & Render for hosting

## 📧 Contact

**Praveen Kumar**
- GitHub: [@praveen-86176](https://github.com/praveen-86176)

---

Made with ❤️ using React, Node.js, and AI
