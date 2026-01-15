const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    analysis: {
        foodItems: [String],
        healthiness: {
            type: String,
            enum: ['Healthy', 'Moderately Healthy', 'Unhealthy'],
            required: true
        },
        explanation: String,
        recommendation: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Meal', MealSchema);
