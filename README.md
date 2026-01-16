# 🥗 NutriVeda - AI Nutrition Assistant

An intelligent food analysis application that uses Google Gemini AI to provide instant nutritional insights from food images.

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
git clone <your-repo-url>
cd DreamBig
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/nutrition-assistant
GEMINI_API_KEY=your_gemini_api_key_here
```

**⚠️ IMPORTANT:** Never commit your `.env` file to version control!

## 🏃 Running the Application

### Start Backend
```bash
cd backend
npm start
```
Server will run on `http://localhost:5001`

### Start Frontend
```bash
cd frontend
npm run dev
```
App will run on `http://localhost:5173`

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

## 🔒 Security

- API keys stored in environment variables
- `.env` files excluded from version control
- Comprehensive `.gitignore` configuration
- No sensitive data in source code

## 📂 Project Structure

```
DreamBig/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── server.js        # Express server
│   ├── .env.example     # Environment template
│   └── package.json
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── App.jsx      # Main component
│   │   └── index.css    # Global styles
│   └── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for powerful image analysis
- Tailwind CSS for beautiful styling
- Recharts for data visualization

---

Made with ❤️ using React, Node.js, and AI by **Praveen Kumar**
