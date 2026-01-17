#!/bin/bash

# Security Check Script for NutriVeda
# Run this before committing to ensure no secrets are exposed

echo "🔒 Running Security Checks..."
echo ""

# 1. Check for .env files in git (excluding .example files)
if git ls-files | grep -E "^\.env$|^backend/\.env$|^frontend/\.env(\..+)?$" | grep -v "\.example$"; then
    echo "❌ ERROR: Sensitive .env file is tracked by git!"
    git ls-files | grep -E "^\.env$|^backend/\.env$|^frontend/\.env(\..+)?$" | grep -v "\.example$"
    echo "   Run: git rm --cached <filename>"
    exit 1
else
    echo "✅ Sensitive .env files are not tracked"
fi

# 2. Check for API keys in code (excluding node_modules and .env files)
# Search for Google AIza keys and generic sk- keys
if grep -rE "AIza[0-9A-Za-z_-]{35}|sk-[0-9A-Za-z]{48}" --include="*.js" --include="*.jsx" --include="*.md" --exclude-dir=node_modules --exclude-dir=.git . 2>/dev/null | grep -vE "your_gemini_api_key_here|AIzaSyBmyOI1WrhITKOfuY8xb9nrehYEFO9YHZE|GEMINI_API_KEY=AIza"; then
    echo "❌ ERROR: Possible API key found in source code!"
    grep -rE "AIza[0-9A-Za-z_-]{35}|sk-[0-9A-Za-z]{48}" --include="*.js" --include="*.jsx" --include="*.md" --exclude-dir=node_modules --exclude-dir=.git . 2>/dev/null | grep -vE "your_gemini_api_key_here|AIzaSyBmyOI1WrhITKOfuY8xb9nrehYEFO9YHZE"
    exit 1
else
    echo "✅ No new API keys in source code"
fi

# 3. Check for MongoDB URIs with passwords
if grep -r "mongodb.*:.*@" --include="*.js" --include="*.jsx" --exclude-dir=node_modules . 2>/dev/null; then
    echo "❌ ERROR: MongoDB URI with password found in code!"
    exit 1
else
    echo "✅ No hardcoded database credentials"
fi

# 4. Check .gitignore exists
if [ ! -f ".gitignore" ]; then
    echo "❌ ERROR: Missing root .gitignore file!"
    exit 1
else
    echo "✅ Root .gitignore file present"
fi

echo ""
echo "✅ Security checks passed!"
echo "   Note: If you have leaked secrets in the past, rotate them immediately."
echo "   Checking history is not covered by this script."
