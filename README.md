# 🥗 NutriVeda - AI Nutrition Assistant
NutriLens is an AI-powered web app that instantly analyzes food images to deliver accurate nutritional insights—including calories, protein, carbs, and fats—helping users make smarter dietary choices effortlessly.
## ✨ Features

- 📸 **Instant Analysis** - Upload or capture food images for immediate nutritional breakdown
- 🤖 **AI-Powered** - Uses Google Gemini Vision AI for accurate food recognition
- 📊 **Detailed Insights** - Get macros, micros, calories, ingredients, and health scores
- 🎯 **Smart Categorization** - Foods are classified as Healthy, Balanced, or Indulgent
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🌓 **Dark/Light Mode** - Toggle between themes for comfortable viewing
- 📜 **History Tracking** - View your past meal analyses

## 🚀 Tech Stack

### Frontend
- **React** with Vite
- **Tailwind CSS v4** for styling
- **Recharts** for data visualization
- **Lucide React** for icons
- **react-webcam** for camera integration

### Backend
- **Node.js** with Express
- **MongoDB** for data persistence
- **Google Gemini AI** for image analysis
- **Multer** for file uploads

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/praveen-86176/DreamBig.git
cd DreamBig
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

## 🏃 Running the Application

### Start Backend
```bash
cd backend
npm start
```

### Start Frontend
```bash
cd frontend
npm run dev
```

## 📱 Usage

1. **Upload or Capture** - Click "Upload Image" or "Open Camera"
2. **Analyze** - AI processes the image and identifies the food
3. **Review** - Get detailed nutritional breakdown with:
   - Food name and serving size
   - Calories and macronutrients (protein, carbs, fats, fiber, sugar)
   - Micronutrients (vitamins and minerals)
   - Ingredients list
   - Health score (0-100)
   - Category (Healthy/Balanced/Indulgent)
4. **Track** - View your meal history anytime

## 🎨 Features in Detail

### Food Categorization
- **🥗 Healthy** - Nutritious, balanced, low processed foods
- **🍛 Balanced** - Moderate nutrition, home-cooked meals
- **🍔 Indulgent** - High calorie, processed, fast foods

### Nutritional Analysis
- Accurate calorie estimation
- Complete macro breakdown (protein, carbs, fats, fiber, sugar)
- Key micronutrients (vitamins and minerals)
- Ingredient detection
- Health score based on nutritional value


## 📂 Project Structure

```
DreamBig/
├── backend/
│   ├── server.js          # Express server
│   ├── .env.example       # Environment template
│   └── package.json
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── App.jsx        # Main component
│   │   └── index.css      # Global styles
│   └── package.json
└── README.md
```

---

Made with ❤️ using React, Node.js, and AI by **Praveen Kumar**
