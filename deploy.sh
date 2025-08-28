#!/bin/bash

echo "🚀 Deploying Permutive GCS Demo to natslabs.com"
echo "================================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Building the application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}❌ Build failed. Please fix errors and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"
echo ""
echo -e "${BLUE}📋 Deployment Instructions:${NC}"
echo "=================================="
echo ""
echo "The static files are ready in the 'out' directory."
echo ""
echo -e "${YELLOW}To deploy to https://www.natslabs.com/permutive-gcs-demo/:${NC}"
echo ""
echo "1. Upload the contents of the 'out' directory to your server:"
echo "   - Upload everything inside 'out/' to /permutive-gcs-demo/ on your server"
echo "   - Make sure to preserve the folder structure (_next directory)"
echo ""
echo "2. If using FTP/SFTP:"
echo "   sftp user@natslabs.com"
echo "   cd /path/to/web/root/permutive-gcs-demo"
echo "   put -r out/* ."
echo ""
echo "3. If using rsync (recommended):"
echo "   rsync -avz --delete out/ user@natslabs.com:/path/to/web/root/permutive-gcs-demo/"
echo ""
echo "4. If using cPanel or similar:"
echo "   - Create a folder called 'permutive-gcs-demo' in your public_html"
echo "   - Upload all contents from 'out' folder into it"
echo ""
echo -e "${GREEN}📁 Files to upload:${NC}"
ls -la out/
echo ""
echo -e "${BLUE}🔐 Password Protection:${NC}"
echo "   The demo is password protected."
echo "   Password: permutive"
echo ""
echo -e "${GREEN}✨ Once uploaded, your demo will be live at:${NC}"
echo "   https://www.natslabs.com/permutive-gcs-demo/"
echo ""