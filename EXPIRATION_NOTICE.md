# Demo Expiration Notice

## Important: This Demo Has a 14-Day Lifespan

**Deployment Date:** August 28, 2025  
**Expiration Date:** September 11, 2025  
**URL:** https://www.natslabs.com/gcs-demo/

## What Happens After Expiration?

After September 11, 2025, the demo will:
1. Display an "Demo Expired" message instead of the login screen
2. Prevent access to the demo interface
3. Show contact information for renewal

## To Remove or Extend:

### Option 1: Remove the Demo
```bash
# Delete from GitHub Pages
git push origin --delete gh-pages

# Or archive the repository
gh repo archive NatMota/gcs-demo
```

### Option 2: Extend the Demo
Edit `/src/app/page.tsx` line 238:
```javascript
const deploymentDate = new Date('2025-08-28'); // Change this date
```

Then rebuild and redeploy:
```bash
npm run build
git add -A
git commit -m "Extend demo expiration"
git push origin main
git subtree push --prefix out origin gh-pages
```

### Option 3: Remove Expiration
Remove the expiration check from `/src/app/page.tsx` lines 234-246 and 451-478.

## Current Access

**Password:** `permutive`

## Repository

GitHub: https://github.com/NatMota/gcs-demo

---

*This demo was created for demonstration purposes and includes an automatic expiration to ensure temporary access.*