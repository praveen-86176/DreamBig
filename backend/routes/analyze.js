const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Meal = require('../models/Meal');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType
        },
    };
}

// GET History
router.get('/history', async (req, res) => {
    try {
        const history = await Meal.find().sort({ createdAt: -1 }).limit(20);
        res.json({ success: true, data: history });
    } catch (error) {
        console.error("Error fetching history:", error);
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

// Analyze Image
router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });

    try {
        const filePath = req.file.path;
        const mimeType = req.file.mimetype;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
    You are an expert AI Nutritionist.
    Analyze this food image and return a detailed JSON response.
    
    REQUIRED FIELDS:
    1. foodName: specific name (e.g. "Grilled Chicken Salad").
    2. servingSize: estimated portion (e.g. "1 bowl (350g)").
    3. calories: total calories (number).
    4. macros: object with 'protein', 'carbs', 'fat', 'fiber', 'sugar' (all numbers in grams).
    5. micros: object with key-value pairs for top minerals/vitamins (e.g. "Iron": "15%", "Vitamin C": "20mg").
    6. ingredients: array of proper case strings listing main ingredients detected or likely present (e.g. ["Salmon", "Quinoa", "Avocado"]).
    7. category: "Healthy" | "Balanced" | "Indulgent".
    8. score: Health score 0-100.
    9. emoji: Single relevant emoji.
    10. shortDescription: One interesting sentence about the nutritional value.

    OUTPUT JSON (NO MARKDOWN):
    {
      "foodName": "String",
      "servingSize": "String",
      "calories": Number,
      "macros": { "protein": Number, "carbs": Number, "fat": Number, "fiber": Number, "sugar": Number },
      "micros": { "String": "String" },
      "ingredients": ["String", "String"],
      "category": "String",
      "score": Number,
      "emoji": "String",
      "shortDescription": "String"
    }
    `;

        const result = await model.generateContent([prompt, fileToGenerativePart(filePath, mimeType)]);
        const text = result.response.text().replace(/```json|```/g, '').trim();
        const analysisData = JSON.parse(text);

        // Save to DB
        const newMeal = new Meal({
            imageUrl: "https://placehold.co/600x400?text=Uploaded+Image",
            analysis: analysisData
        });
        await newMeal.save();

        fs.unlinkSync(filePath);
        res.json({ success: true, data: newMeal });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Analysis failed", raw: error.message });
    }
});

module.exports = router;
