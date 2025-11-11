# GitHub Pages Deployment Guide

This guide explains how to deploy the sales-tracker web app to GitHub Pages.

## Option 1: Automatic Deployment with GitHub Actions (Recommended)

We've configured a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys your web app to GitHub Pages whenever you push to the `main` branch.

### Setup Steps:

1. **Go to your GitHub repository settings**
   - Navigate to: `https://github.com/Khurtiss/sales-tracker/settings`

2. **Enable GitHub Pages**
   - In the left sidebar, click **Pages**
   - Under "Build and deployment", select:
     - **Source:** `Deploy from a branch`
     - **Branch:** `gh-pages` (this is created automatically by the workflow)
     - **Folder:** `/ (root)`
   - Click **Save**

3. **Automatic deployment is now active**
   - Every push to `main` will:
     - Install dependencies
     - Build the web app (`npm run build`)
     - Deploy to `gh-pages` branch
     - Update your live site at: `https://Khurtiss.github.io/sales-tracker`

### Monitor Deployments:

- Go to **Actions** tab in your GitHub repo
- Watch the `deploy.yml` workflow run
- Check the **Deployments** tab for deployment history

---

## Option 2: Manual Deployment

If you prefer to deploy manually:

### Steps:

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Initialize gh-pages if first time**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy the dist folder**
   ```bash
   npx gh-pages -d dist
   ```

4. **Enable GitHub Pages on `gh-pages` branch** (same as Option 1, Step 2)

---

## Option 3: Using dist Directory in Version Control

If you want to commit `dist/` to the repository:

1. **Remove dist from .gitignore**
   ```bash
   # Edit .gitignore and remove the "dist/" line
   ```

2. **Commit and push the dist folder**
   ```bash
   git add dist/
   git commit -m "Add built web app to dist"
   git push origin main
   ```

3. **Enable GitHub Pages on `main` branch**
   - In repository settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/dist`
   - Click **Save**

⚠️ **Note:** This approach means you'll track large compiled files in git, which is generally not recommended. Option 1 (GitHub Actions) is preferred.

---

## Testing Your Deployment Locally

Before deploying, test the web app locally:

```bash
npm run web
```

This starts the dev server. The app will be available at `http://localhost:8081` (or similar).

---

## Troubleshooting

### Build Fails in GitHub Actions
- Check the **Actions** tab logs for specific errors
- Ensure `npm run build` works locally before pushing
- Verify all dependencies are in `package.json` (not just `node_modules`)

### Site not appearing after deployment
- GitHub Pages takes ~1 minute to deploy
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check that GitHub Pages is enabled in repository settings

### Assets not loading
- The web app is deployed to `/sales-tracker` path, not root
- Ensure Expo Router handles relative paths correctly
- Check browser DevTools Console for 404 errors on assets

---

## Live URL

Once deployed, your app will be available at:
```
https://Khurtiss.github.io/sales-tracker
```

Verify it's working by checking the **Deployments** section in your GitHub repo settings.
