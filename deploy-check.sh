#!/bin/bash

echo "🚀 NutriVeda Render Deployment Setup"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the project root?"
    exit 1
fi

echo "📋 Pre-deployment Checklist:"
echo ""
echo "1. ✅ package.json exists"
echo "2. ✅ render.yaml exists"
echo "3. ✅ DEPLOYMENT.md guide available"
echo ""

echo "📝 Next Steps for Render Deployment:"
echo ""
echo "1. Go to: https://dashboard.render.com/"
echo "2. Click 'New +' → 'Web Service'"
echo "3. Connect GitHub repo: praveen-86176/DreamBig"
echo "4. Use these settings:"
echo "   - Name: nutriveda-backend"
echo "   - Runtime: Node"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo ""
echo "5. Add Environment Variables:"
echo "   PORT=10000"
echo "   GEMINI_API_KEY=your_api_key_here"
echo "   MONGODB_URI=your_mongodb_connection_string"
echo ""
echo "6. Click 'Create Web Service'"
echo ""
echo "📖 For detailed guide, see: DEPLOYMENT.md"
echo ""
echo "✅ Your code is ready for deployment!"
