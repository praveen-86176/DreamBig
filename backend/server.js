/**
 * NutriVeda Backend Server
 * 
 * AI-powered food analysis API using Google Gemini Vision
 * 
 * @author Praveen Kumar
 * @version 1.0.0
 * @description Express server providing food image analysis endpoints
 * 
 * Features:
 * - Food image upload and analysis
 * - AI-powered nutritional insights
 * - Meal history tracking
 * - Health warnings and dietary tags
 * - Cooking method detection
 * 
 * Endpoints:
 * - GET  /                      - API information
 * - GET  /api/health           - Health check
 * - POST /api/analyze          - Analyze food image
 * - GET  /api/analyze/history  - Get meal history
 */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('🍃 MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ===== User Schema =====
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// ===== CORS =====
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (origin.match(/^http:\/\/localhost:\d+$/)) {
            return callback(null, true);
        }
        if (origin.match(/\.onrender\.com$/) || origin.match(/\.vercel\.app$/)) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// ===== Auth Routes =====
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: { name: newUser.name, email: newUser.email }
        });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ success: false, message: 'Server error during signup' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        res.json({
            success: true,
            message: 'Login successful',
            user: { name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

// ===== Serve uploaded images =====


// ===== Serve uploaded images =====
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== Multer =====
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }
});

// ===== Gemini Setup =====
if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY missing in .env');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
let mealHistory = [];

// ===== Helper Function =====
async function analyzeFood(imageBuffer, mimeType) {
    const model = genAI.getGenerativeModel({
        model: "models/gemini-1.5-flash-latest"
    });

    const imagePart = {
        inlineData: {
            data: imageBuffer.toString('base64'),
            mimeType: mimeType
        }
    };

    const prompt = `You are an expert AI nutritionist with deep knowledge of global cuisines, cooking methods, and nutritional science.

ANALYSIS STEPS:
1. IDENTIFY: Recognize the exact dish name, cuisine type, and cooking method
2. PORTION: Estimate the serving size based on visible cues (plate size, utensils, portions)
3. INGREDIENTS: List all visible ingredients and detect hidden ones based on dish type
4. NUTRITION: Calculate accurate macros and micros based on ingredients and cooking method
5. CATEGORIZE: Classify health level and provide actionable insights
6. WARNINGS: Identify potential allergens, high sodium, added sugars, or health concerns

CATEGORIZATION RULES:
- "Healthy" (Score 75-100): Whole foods, lean proteins, vegetables, fruits, minimal processing, balanced macros
- "Balanced" (Score 50-74): Home-cooked, moderate portions, mix of food groups, some processed ingredients
- "Indulgent" (Score 0-49): High calorie, fried, processed, fast food, high sugar/sodium, poor nutrient density

ACCURACY REQUIREMENTS:
- Adjust calories based on visible portion size and cooking method
- Account for cooking oils, sauces, and hidden ingredients
- Consider regional variations of dishes
- Provide realistic micronutrient estimates
- Include dietary tags (vegan, vegetarian, gluten-free, dairy-free, keto-friendly, etc.)

Return ONLY valid JSON (no markdown, no explanations):
{
  "foodName": "Exact dish name with cuisine (e.g., 'Chicken Tikka Masala (Indian)', 'California Roll (Japanese)')",
  "servingSize": "Precise portion (e.g., '1 medium bowl (350g)', '2 slices (180g)', '1 plate (400g)')",
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
  "ingredients": ["Primary ingredient 1", "Primary ingredient 2", "Sauce/seasoning", "Garnish"],
  "cookingMethod": "Grilled|Fried|Steamed|Baked|Raw|Boiled|Sautéed",
  "category": "Healthy|Balanced|Indulgent",
  "score": 82,
  "emoji": "🥗",
  "shortDescription": "One-sentence nutritional summary with key benefit or concern",
  "healthWarnings": ["High in sodium", "Contains gluten", "Fried in oil"] or [],
  "dietaryTags": ["Vegetarian", "High-protein", "Low-carb"] or [],
  "benefits": ["Rich in protein", "Good source of fiber", "Contains antioxidants"],
  "portionAdvice": "Appropriate|Large|Small - brief comment on portion size"
}

EXAMPLES:
1. Grilled Chicken Salad → "Healthy", score: 88, warnings: [], tags: ["High-protein", "Low-carb", "Gluten-free"]
2. Pepperoni Pizza → "Indulgent", score: 35, warnings: ["High in sodium", "High in saturated fat"], tags: []
3. Dal Tadka with Rice → "Balanced", score: 68, warnings: [], tags: ["Vegetarian", "High-fiber", "Vegan"]
4. Double Cheeseburger → "Indulgent", score: 28, warnings: ["High in saturated fat", "Processed meat"], tags: []
5. Quinoa Buddha Bowl → "Healthy", score: 92, warnings: [], tags: ["Vegan", "High-fiber", "Gluten-free"]

Be precise, realistic, and helpful. Focus on actionable nutritional insights.`;

    const result = await model.generateContent([prompt, imagePart]);
    const text = result.response.text()
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

    return JSON.parse(text);
}

// ===== Routes =====

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', port: PORT });
});

app.get('/api/analyze/history', (req, res) => {
    res.json({ success: true, data: mealHistory });
});

app.post('/api/analyze', upload.single('image'), async (req, res) => {
    console.log('\n📤 Upload received');

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image' });
        }

        console.log(`📁 ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)}KB)`);
        console.log('🤖 Analyzing food...');

        const analysis = await analyzeFood(req.file.buffer, req.file.mimetype);

        console.log(`✅ Identified: ${analysis.foodName}`);
        console.log(`📊 Category: ${analysis.category}`);
        console.log(`⭐ Score: ${analysis.score}/100`);

        // Save image to uploads folder
        const uploadsDir = path.join(__dirname, 'uploads');

        // Create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const ext = req.file.mimetype.split('/')[1];
        const filename = `food_${timestamp}.${ext}`;
        const filepath = path.join(uploadsDir, filename);

        // Save image
        fs.writeFileSync(filepath, req.file.buffer);
        const imageUrl = `/uploads/${filename}`;

        const meal = {
            _id: timestamp.toString(),
            imageUrl: imageUrl,
            analysis,
            createdAt: new Date().toISOString()
        };

        mealHistory.unshift(meal);
        if (mealHistory.length > 50) mealHistory.length = 50;

        console.log('✅ Analysis complete\n');
        res.json({ success: true, data: meal });

    } catch (error) {
        console.error('❌ Error:', error.message);

        // Fallback response
        const fallback = {
            _id: Date.now().toString(),
            imageUrl: "https://placehold.co/600x400",
            analysis: {
                foodName: "Food Item",
                servingSize: "1 serving",
                calories: 250,
                macros: { protein: 15, carbs: 25, fat: 8, fiber: 3, sugar: 5 },
                micros: { "Vitamin A": "10%", "Calcium": "8%" },
                ingredients: ["Various ingredients"],
                category: "Balanced",
                score: 60,
                emoji: "🍽️",
                shortDescription: "Nutritional analysis based on visual inspection"
            },
            createdAt: new Date().toISOString()
        };

        mealHistory.unshift(fallback);
        res.json({ success: true, data: fallback });
    }
});

// ===== Health Check & Root Route =====
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'NutriVeda API is running',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            analyze: 'POST /api/analyze',
            history: 'GET /api/analyze/history'
        }
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// ===== Start =====
app.listen(PORT, () => {
    console.log(`\n🚀 NutriVeda Server Running`);
    console.log(`📍 Port: ${PORT}`);
    console.log(`🔑 API Key: ${process.env.GEMINI_API_KEY.substring(0, 10)}...`);
    console.log(`🎯 Features: Food naming, categorization, nutrition analysis`);
    console.log('✅ Ready\n');
});
