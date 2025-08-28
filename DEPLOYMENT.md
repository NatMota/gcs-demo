# Deployment Instructions for natslabs.com

## Quick Deploy

The app has been built and is ready for deployment. The static files are in the `out` directory.

## Files to Upload

Upload everything from the `out` directory to your server at `/permutive-gcs-demo/`

```
out/
├── index.html
├── 404.html
├── index.txt
└── _next/
    ├── static/
    └── ...
```

## Deployment Methods

### Method 1: cPanel File Manager (Easiest)
1. Log into your cPanel at natslabs.com
2. Navigate to File Manager
3. Go to public_html
4. Create a new folder called `permutive-gcs-demo`
5. Upload all files from the `out` folder into `permutive-gcs-demo`
6. Make sure to upload the `_next` folder with all its contents

### Method 2: FTP/SFTP
```bash
# Connect to your server
ftp ftp.natslabs.com
# or
sftp user@natslabs.com

# Navigate to web root
cd public_html

# Create directory if it doesn't exist
mkdir permutive-gcs-demo
cd permutive-gcs-demo

# Upload all files from out directory
put -r /path/to/out/* .
```

### Method 3: rsync (If you have SSH access)
```bash
rsync -avz --delete out/ user@natslabs.com:/home/user/public_html/permutive-gcs-demo/
```

## Verification

After uploading, your demo should be accessible at:
**https://www.natslabs.com/permutive-gcs-demo/**

## Access Credentials

The demo is password protected:
- **Password**: `permutive`

## Important Notes

1. Make sure to upload ALL files including hidden files and the `_next` directory
2. Preserve the folder structure exactly as it is in the `out` directory
3. The site is configured to run from the `/permutive-gcs-demo/` subfolder
4. All assets and routing are configured for this path

## Troubleshooting

If the site doesn't load correctly:
1. Check that all files were uploaded (especially the _next folder)
2. Verify the folder structure matches exactly
3. Clear your browser cache
4. Check browser console for any 404 errors on assets

## Re-building

If you need to rebuild the app:
```bash
npm run build
```

This will regenerate all files in the `out` directory.