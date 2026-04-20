# Netlify Deployment Guide

## Prerequisites
- Netlify account
- Git repository (GitHub, GitLab, or Bitbucket)
- Node.js 18+ installed locally

## Deployment Steps

### 1. Build the Project
```bash
npm run build
```

### 2. Deploy to Netlify

#### Option A: Drag and Drop
1. Run `npm run build`
2. Drag the `dist` folder to Netlify deploy page
3. Your site will be live instantly

#### Option B: Git Integration
1. Push your code to a Git repository
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

#### Option C: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

## Configuration Files

### netlify.toml
- Handles SPA routing
- Sets security headers
- Configures caching
- Defines build environment

### _redirects
- Ensures client-side routing works
- Redirects all routes to index.html

## Environment Variables
Set these in Netlify dashboard under Site settings > Environment variables:

```
NODE_VERSION=18
```

## Build Process
1. Netlify runs `npm run build`
2. Creates optimized static files in `dist/`
3. Deploys to global CDN
4. Automatic SSL certificate
5. Custom domain support

## Post-Deployment
- Test all routes work correctly
- Verify admin login functionality
- Check responsive design
- Test mobile compatibility

## Troubleshooting
- If routes don't work: Check `_redirects` file
- If build fails: Check Node version and dependencies
- If images don't load: Verify asset paths in build

## Continuous Deployment
Set up automatic deployments:
1. Connect Git repository
2. Configure build hooks
3. Enable automatic deploys on push to main branch

## Performance Optimization
- Assets are automatically optimized
- CDN distribution
- Gzip compression
- Browser caching headers configured
