#!/bin/bash

# Simple deployment script for GitHub Pages

echo "🚀 Building and deploying to GitHub Pages..."

# Build the static site
echo "📦 Building the project..."
npm run build

# Add .nojekyll file to prevent Jekyll processing
touch out/.nojekyll

# Add and commit the build
echo "📝 Committing build..."
git add -f out/
git commit -m "Deploy to GitHub Pages - $(date)" || echo "No changes to commit"

# Push to main
git push origin main

# Deploy to gh-pages branch
echo "🌐 Deploying to GitHub Pages..."
git subtree push --prefix out origin gh-pages

echo "✅ Deployment complete!"
echo "🔗 Your site is live at: http://www.natslabs.com/permutive-gcs-demo/"