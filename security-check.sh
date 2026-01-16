#!/bin/bash

# Security Check Script for NutriVeda
# Run this before committing to ensure no secrets are exposed

echo "🔒 Running Security Checks..."
echo ""

# Check for .env files in git
if git ls-files | grep -q "\.env$"; then
    echo "❌ ERROR: .env file is tracked by git!"
    echo "   Run: git rm --cached backend/.env"
    exit 1
else
    echo "✅ .env files are not tracked"
fi

# Check for API keys in code (excluding node_modules and .env files)
if grep -r "AIza" --include="*.js" --include="*.jsx" --exclude-dir=node_modules frontend/src/ backend/*.js 2>/dev/null | grep -v "your_gemini_api_key_here"; then
    echo "❌ ERROR: API key found in source code!"
    exit 1
else
    echo "✅ No API keys in source code"
fi

# Check for MongoDB URIs with passwords (excluding node_modules)
if grep -r "mongodb.*:.*@" --include="*.js" --include="*.jsx" --exclude-dir=node_modules frontend/src/ backend/*.js 2>/dev/null; then
    echo "❌ ERROR: MongoDB URI with password found in code!"
    exit 1
else
    echo "✅ No hardcoded database credentials"
fi

# Check .gitignore exists
if [ ! -f ".gitignore" ] || [ ! -f "backend/.gitignore" ]; then
    echo "❌ ERROR: Missing .gitignore files!"
    exit 1
else
    echo "✅ .gitignore files present"
fi

echo ""
echo "✅ All security checks passed!"
echo "   Safe to commit."
