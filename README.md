# 🥗 NutriVeda - AI Nutrition Assistant

<div align="center">

![NutriVeda Logo](https://img.shields.io/badge/NutriVeda-AI%20Nutrition-10b981?style=for-the-badge&logo=nutrition&logoColor=white)

[![Backend Status](https://img.shields.io/badge/Backend-Live%20on%20Render-success?style=flat-square)](https://dreambig.onrender.com)
[![Frontend Status](https://img.shields.io/badge/Frontend-Vercel-blue?style=flat-square)](https://dream-big-4hri.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Node](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org)

**AI-powered food analysis with instant nutritional insights using Google Gemini Vision AI**

[Live Demo](https://dream-big-4hri.vercel.app) • [API Docs](#-api-endpoints) • [Report Bug](https://github.com/praveen-86176/DreamBig/issues)

</div>

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Live Demo](#-live-demo)
- [Quick Start](#-quick-start)
- [Environment Setup](#-environment-variables)
- [Deployment](#-deployment)
- [API Documentation](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Security](#-security)
- [Contributing](#-contributing)

---

## ✨ Features

### 🎯 Core Features
- **📸 Instant Analysis** - Upload or capture food images for immediate analysis
- **🤖 AI-Powered Recognition** - Google Gemini Vision AI for accurate food identification
- **📊 Comprehensive Insights** - Detailed macros, micros, calories, and ingredients
- **🏷️ Smart Categorization** - Classifies food as Healthy, Balanced, or Indulgent

### 🔍 Advanced Features
- **⚠️ Health Warnings** - Alerts for allergens, high sodium, processed foods
- **🎯 Dietary Tags** - Vegan, Vegetarian, High-protein, Low-carb, Gluten-free, etc.
- **🍳 Cooking Method Detection** - Identifies preparation method (Grilled, Fried, etc.)
- **📏 Portion Advice** - Smart serving size recommendations
- **💪 Health Benefits** - Highlights nutritional advantages
- **📜 Activity History** - Track and review past meal analyses with images

### 🎨 User Experience
- **📱 Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- **🌓 Dark/Light Mode** - Eye-friendly theme switching
- **⚡ Real-time Analysis** - Fast AI processing
- **🎨 Modern UI** - Beautiful, intuitive interface with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
```
React 18          - UI framework
Vite             - Build tool & dev server
Tailwind CSS v4  - Styling framework
Recharts         - Data visualization
Lucide React     - Icon library
react-webcam     - Camera integration
```

### Backend
```
Node.js          - Runtime environment
Express 5        - Web framework
Google Gemini AI - Image analysis
Multer           - File upload handling
CORS             - Cross-origin support
dotenv           - Environment management
```

### Deployment
```
Frontend: Vercel
Backend: Render
Database: MongoDB (optional)
```

---

## 🌐 Live Demo

- **🎨 Frontend**: [https://dream-big-4hri.vercel.app](https://dream-big-4hri.vercel.app)
- **⚙️ Backend API**: [https://dreambig.onrender.com](https://dreambig.onrender.com)
- **❤️ Health Check**: [https://dreambig.onrender.com/api/health](https://dreambig.onrender.com/api/health)

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- **Node.js** >= 18.0.0 ([Download](https://nodejs.org))
- **npm** or **yarn** package manager
- **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey))

### 1️⃣ Clone Repository

```bash
git clone https://github.com/praveen-86176/DreamBig.git
cd DreamBig
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your GEMINI_API_KEY
nano .env  # or use your preferred editor

# Start backend server
npm start
```

✅ Backend runs on: **http://localhost:5001**

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend runs on: **http://localhost:5173**

### 4️⃣ Test the Application

1. Open browser: `http://localhost:5173`
2. Upload a food image or use camera
3. View instant AI analysis!

---

## 🔐 Environment Variables

### Backend Configuration

Create `backend/.env`:

```env
# Server Port
PORT=5001

# Google Gemini AI API Key (Required)
GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB Connection (Optional)
MONGODB_URI=mongodb://localhost:27017/nutrition-assistant
```

### Frontend Configuration

**Development** (`frontend/.env.development`):
```env
VITE_API_URL=http://localhost:5001
```

**Production** (`frontend/.env.production`):
```env
VITE_API_URL=https://dreambig.onrender.com
```

---

## 📦 Deployment

### 🎨 Frontend Deployment (Vercel)

#### Option 1: Vercel Dashboard (Recommended)

1. **Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Import from GitHub: `praveen-86176/DreamBig`

2. **Configure Settings**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Add Environment Variable**
   - Name: `VITE_API_URL`
   - Value: `https://dreambig.onrender.com`
   - Environments: Production, Preview, Development

4. **Deploy** 🚀

#### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod
```

### ⚙️ Backend Deployment (Render)

1. **Create Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - New → Web Service
   - Connect: `praveen-86176/DreamBig`

2. **Configure**
   ```
   Name: nutriveda-backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

3. **Environment Variables**
   ```
   PORT=10000
   GEMINI_API_KEY=your_actual_api_key
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Deploy** 🚀

---

## 📡 API Endpoints

### Base URL
```
Production: https://dreambig.onrender.com
Development: http://localhost:5001
```

### Endpoints

#### `GET /`
**API Information**
```json
{
  "success": true,
  "message": "NutriVeda API is running",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

#### `GET /api/health`
**Health Check**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2026-01-16T18:00:00.000Z",
  "uptime": 12345
}
```

#### `POST /api/analyze`
**Analyze Food Image**

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `image` (file)

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "1234567890",
    "imageUrl": "/uploads/food_1234567890.jpg",
    "analysis": {
      "foodName": "Chicken Tikka Masala (Indian)",
      "servingSize": "1 bowl (350g)",
      "calories": 420,
      "macros": {
        "protein": 28,
        "carbs": 45,
        "fat": 15,
        "fiber": 8,
        "sugar": 6
      },
      "micros": {
        "Iron": "18%",
        "Vitamin C": "35mg",
        "Calcium": "15%",
        "Vitamin A": "12%",
        "Potassium": "450mg",
        "Sodium": "680mg"
      },
      "ingredients": ["Chicken", "Tomatoes", "Cream", "Spices"],
      "cookingMethod": "Grilled",
      "category": "Balanced",
      "score": 68,
      "emoji": "🍛",
      "shortDescription": "Protein-rich Indian curry with moderate calories",
      "healthWarnings": ["High in sodium"],
      "dietaryTags": ["High-protein"],
      "benefits": ["Rich in protein", "Good source of vitamins"],
      "portionAdvice": "Appropriate - balanced serving size"
    },
    "createdAt": "2026-01-16T18:00:00.000Z"
  }
}
```

#### `GET /api/analyze/history`
**Get Meal History**

**Response:**
```json
{
  "success": true,
  "data": [
    { /* meal object */ },
    { /* meal object */ }
  ]
}
```

---

## 📁 Project Structure

```
DreamBig/
├── 📂 backend/
│   ├── 📄 server.js              # Express server & API routes
│   ├── 📄 .env                   # Environment variables (gitignored)
│   ├── 📄 .env.example           # Environment template
│   ├── 📄 .gitignore             # Backend gitignore
│   ├── 📄 package.json           # Backend dependencies
│   └── 📂 uploads/               # Uploaded food images (gitignored)
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📄 App.jsx            # Main React component
│   │   ├── 📄 main.jsx           # React entry point
│   │   └── 📄 index.css          # Tailwind CSS styles
│   ├── 📂 public/
│   │   └── 🖼️ hero-food.png      # Hero image
│   ├── 📄 .env.development       # Dev environment (gitignored)
│   ├── 📄 .env.production        # Prod environment (gitignored)
│   ├── 📄 .gitignore             # Frontend gitignore
│   ├── 📄 index.html             # HTML template
│   ├── 📄 package.json           # Frontend dependencies
│   ├── 📄 vite.config.js         # Vite configuration
│   └── 📄 tailwind.config.js     # Tailwind configuration
│
├── 📄 package.json               # Root package (Render deployment)
├── 📄 vercel.json                # Vercel configuration
├── 📄 render.yaml                # Render configuration
├── 📄 .gitignore                 # Root gitignore
├── 📄 README.md                  # This file
├── 📄 CLEANUP.md                 # Cleanup documentation
├── 🔒 security-check.sh          # Security validation script
└── 🚀 deploy-check.sh            # Deployment checklist script
```

---

## 🔒 Security

### ✅ Security Measures

- **Environment Variables** - All secrets in `.env` files
- **Git Protection** - `.env` files in `.gitignore`
- **CORS Configuration** - Restricted to specific origins
- **File Validation** - Size limits (10MB) and type checking
- **Input Sanitization** - Multer file filtering
- **Security Scripts** - Automated security checks

### 🛡️ Security Check

Run before every commit:

```bash
./security-check.sh
```

This validates:
- ✅ No `.env` files tracked by git
- ✅ No API keys in source code
- ✅ No hardcoded credentials
- ✅ `.gitignore` files present

---

## 🧪 Testing

### Run Security Check
```bash
./security-check.sh
```

### Run Deployment Check
```bash
./deploy-check.sh
```

### Test Backend Locally
```bash
cd backend
npm start
# Visit: http://localhost:5001
```

### Test Frontend Locally
```bash
cd frontend
npm run dev
# Visit: http://localhost:5173
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test before committing
- Run `./security-check.sh` before pushing
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** - Powerful image analysis
- **Tailwind CSS** - Beautiful styling framework
- **Recharts** - Data visualization library
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **Lucide** - Icon library

---

## 📧 Contact & Support

**Praveen Kumar**

- 🐙 GitHub: [@praveen-86176](https://github.com/praveen-86176)
- 📧 Email: [Email](mailto:praveenk86176@gmail.com)
- 🌐 Live App: [NutriVeda](https://dream-ekbqvnx09-praveen-86176s-projects.vercel.app)

### 🐛 Found a Bug?

Please [open an issue](https://github.com/praveen-86176/DreamBig/issues) with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

Made with ❤️ using React, Node.js, and AI

**[⬆ Back to Top](#-nutriveda---ai-nutrition-assistant)**

</div>
