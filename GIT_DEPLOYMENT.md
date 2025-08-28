# Git-Based Deployment to natslabs.com

Your code is now pushed to GitHub: https://github.com/NatMota/permutive-gcs-demo

## Option 1: Deploy via SSH (Recommended)

1. **SSH into your server**:
```bash
ssh your-user@natslabs.com
```

2. **Navigate to web root**:
```bash
cd /var/www/html  # or your web root directory
```

3. **Clone the repository**:
```bash
git clone https://github.com/NatMota/permutive-gcs-demo.git
```

4. **Build the application**:
```bash
cd permutive-gcs-demo
npm install
npm run build
```

5. **Copy built files to web directory**:
```bash
# If you want it at root /permutive-gcs-demo/
cp -r out/* /var/www/html/permutive-gcs-demo/
```

## Option 2: GitHub Actions Auto-Deploy

Create `.github/workflows/deploy.yml` in your repo:

```yaml
name: Deploy to natslabs.com

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install and Build
      run: |
        npm install
        npm run build
        
    - name: Deploy to Server
      uses: appleboy/scp-action@master
      with:
        host: natslabs.com
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SERVER_KEY }}
        source: "out/*"
        target: "/var/www/html/permutive-gcs-demo/"
```

Add these secrets to your GitHub repo:
- `SERVER_USER`: Your SSH username
- `SERVER_KEY`: Your SSH private key

## Option 3: Pull Updates on Server

1. **Initial setup (one time)**:
```bash
cd /var/www/html
git clone https://github.com/NatMota/permutive-gcs-demo.git
cd permutive-gcs-demo
npm install
npm run build
```

2. **For updates (anytime)**:
```bash
cd /var/www/html/permutive-gcs-demo
git pull origin main
npm install  # if dependencies changed
npm run build
```

## Option 4: Deploy Script on Server

Create `/home/your-user/deploy-permutive-demo.sh`:

```bash
#!/bin/bash
cd /var/www/html/permutive-gcs-demo
git pull origin main
npm install
npm run build
echo "Deployment complete!"
```

Make it executable:
```bash
chmod +x /home/your-user/deploy-permutive-demo.sh
```

Run it anytime to deploy:
```bash
./deploy-permutive-demo.sh
```

## Verification

After deployment, access your demo at:
https://www.natslabs.com/permutive-gcs-demo/

Test with password: `permutive`

## Notes

- The app is configured for subfolder deployment (`/permutive-gcs-demo/`)
- Static files are in the `out/` directory after build
- Ensure your web server serves static files from this directory
- No server-side runtime needed (it's a static export)