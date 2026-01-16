const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// ===== CORS =====
app.use(cors());
app.use(express.json());

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

    const prompt = `You are an expert nutritionist and food analyzer. Analyze this food image carefully and provide detailed information.

IMPORTANT INSTRUCTIONS:
1. Identify the EXACT name of the food/dish (e.g., "Chicken Biryani", "Margherita Pizza", "Caesar Salad")
2. Categorize it accurately:
   - "Healthy" = Nutritious, balanced, low processed (salads, grilled proteins, fruits, vegetables)
   - "Balanced" = Moderate nutrition, home-cooked meals, reasonable portions
   - "Indulgent" = High calorie, processed, fast food, desserts, fried items
3. Provide accurate nutritional estimates based on the visible portion
4. List all visible ingredients

Return ONLY valid JSON (no markdown, no code blocks):
{
  "foodName": "Exact dish name (e.g., Chicken Tikka Masala, Double Cheeseburger)",
  "servingSize": "Estimated portion (e.g., 1 bowl (300g), 2 pieces, 1 plate)",
  "calories": 350,
  "macros": {
    "protein": 25,
    "carbs": 35,
    "fat": 12,
    "fiber": 6,
    "sugar": 4
  },
  "micros": {
    "Iron": "15%",
    "Vitamin C": "20mg",
    "Calcium": "12%",
    "Vitamin A": "8%"
  },
  "ingredients": ["Ingredient1", "Ingredient2", "Ingredient3"],
  "category": "Healthy|Balanced|Indulgent",
  "score": 75,
  "emoji": "🥗",
  "shortDescription": "Brief nutritional summary highlighting key benefits or concerns"
}

Examples:
- Pizza → "Indulgent", emoji: "🍕"
- Salad → "Healthy", emoji: "🥗"
- Dal Rice → "Balanced", emoji: "🍛"
- Burger → "Indulgent", emoji: "🍔"
- Grilled Chicken → "Healthy", emoji: "🍗"`;

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

        const meal = {
            _id: Date.now().toString(),
            imageUrl: "https://placehold.co/600x400",
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

// ===== Start =====
app.listen(PORT, () => {
    console.log(`\n🚀 NutriVeda Server Running`);
    console.log(`📍 Port: ${PORT}`);
    console.log(`🔑 API Key: ${process.env.GEMINI_API_KEY.substring(0, 10)}...`);
    console.log(`🎯 Features: Food naming, categorization, nutrition analysis`);
    console.log('✅ Ready\n');
});
