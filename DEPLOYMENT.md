# Deployment Guide

This guide provides step-by-step instructions for deploying the Web3 Wallet application to various platforms.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Fastest)

Vercel provides the easiest deployment experience with automatic builds and global CDN.

#### Deploy via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Navigate to your project directory:
```bash
cd web3-metamask-wallet
```

3. Login to Vercel (if not already logged in):
```bash
vercel login
```

4. Deploy:
```bash
vercel
```

5. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? Press enter (uses default)
   - In which directory is your code located? **./`** (press enter)
   - Want to override the settings? **N**

6. Your app will be deployed and you'll get a URL like: `https://web3-metamask-wallet.vercel.app`

#### Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect the framework (Vite)
5. Click "Deploy"
6. Done! Your app is live.

---

### Option 2: Netlify

Netlify offers great performance and easy setup with continuous deployment.

#### Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build your project:
```bash
npm run build
```

3. Login to Netlify:
```bash
netlify login
```

4. Initialize and deploy:
```bash
netlify init
```

5. Follow the prompts:
   - Create & configure a new site? **Yes**
   - Team? Select your team
   - Site name? Enter a name or leave blank for random
   - Build command? `npm run build`
   - Directory to deploy? `dist`

6. Deploy to production:
```bash
netlify deploy --prod
```

#### Deploy via Netlify Dashboard

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git provider
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

#### Deploy via Drag & Drop

1. Build your project:
```bash
npm run build
```

2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop the `dist` folder
4. Your site is live instantly!

---

### Option 3: GitHub Pages

Perfect for open-source projects hosted on GitHub.

#### Setup

1. Install gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Update your `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts` to set the base URL:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/web3-metamask-wallet/', // Replace with your repo name
})
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Folder: / (root)
   - Click Save

6. Your site will be available at:
   `https://yourusername.github.io/web3-metamask-wallet/`

---

### Option 4: Cloudflare Pages

Fast global deployment with Cloudflare's edge network.

#### Deploy via Dashboard

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to Pages
3. Click "Create a project"
4. Connect to your Git repository
5. Configure build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Click "Save and Deploy"

#### Deploy via Wrangler CLI

1. Install Wrangler:
```bash
npm install -g wrangler
```

2. Login:
```bash
wrangler login
```

3. Build your project:
```bash
npm run build
```

4. Deploy:
```bash
wrangler pages deploy dist --project-name=web3-wallet
```

---

### Option 5: Firebase Hosting

Reliable hosting backed by Google's infrastructure.

#### Setup

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase in your project:
```bash
firebase init
```

4. Select options:
   - Select: **Hosting**
   - Use an existing project or create new one
   - Public directory: `dist`
   - Configure as single-page app: **Yes**
   - Set up automatic builds: **No** (optional)
   - Overwrite index.html: **No**

5. Build your project:
```bash
npm run build
```

6. Deploy:
```bash
firebase deploy
```

7. Your site will be available at:
   `https://your-project-id.web.app`

---

### Option 6: Render

Simple deployment with automatic SSL and custom domains.

1. Go to [render.com](https://render.com)
2. Click "New" → "Static Site"
3. Connect your Git repository
4. Configure:
   - Name: Your app name
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. Click "Create Static Site"

---

## 🔧 Environment Configuration

This application doesn't require any environment variables as it:
- Uses public Ethereum Mainnet RPC (via MetaMask)
- Connects to public smart contracts (USDT)
- Doesn't have a backend API

## 🌐 Custom Domain Setup

### Vercel
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

### Netlify
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions

### GitHub Pages
1. Add a `CNAME` file in the `public` folder with your domain
2. Configure DNS with CNAME record pointing to `yourusername.github.io`

## 🔒 SSL/HTTPS

All the platforms mentioned above provide **automatic HTTPS** with free SSL certificates. No configuration needed!

## 📊 Post-Deployment Checklist

After deploying, verify:

- ✅ Site loads correctly
- ✅ MetaMask connection works
- ✅ ETH balance displays correctly
- ✅ USDT balance displays correctly
- ✅ Responsive design works on mobile
- ✅ Error messages display properly
- ✅ Account switching works
- ✅ Network detection works

## 🐛 Troubleshooting

### Build Fails

**Error**: `npm run build` fails
- Check Node.js version (should be 18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`

### Site loads but functionality broken

**Issue**: White screen or errors in console
- Check browser console for errors
- Ensure MetaMask is installed
- Verify you're on Ethereum Mainnet

### MetaMask not detected

**Issue**: "MetaMask is not installed" message appears
- This is expected if MetaMask isn't installed
- The message includes a link to install MetaMask
- Test with MetaMask installed

## 🔄 Continuous Deployment

Most platforms support automatic deployments:

### Vercel & Netlify
- Automatically deploy on every push to main/master branch
- Preview deployments for pull requests
- No additional configuration needed

### GitHub Pages
- Requires manual deployment with `npm run deploy`
- Or set up GitHub Actions for automation

### Example GitHub Actions workflow:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 📈 Monitoring & Analytics

Consider adding:

- **Google Analytics**: Track user engagement
- **Sentry**: Monitor errors in production
- **Vercel Analytics**: Built-in performance monitoring
- **Plausible/Fathom**: Privacy-friendly analytics

## 🎯 Performance Optimization

The app is already optimized, but you can further improve:

1. **Enable compression** (automatic on most platforms)
2. **Use CDN** (automatic on Vercel, Netlify, Cloudflare)
3. **Optimize images** (if you add any)
4. **Enable caching** (configured in vercel.json/netlify.toml)

## 💰 Cost

All deployment options mentioned offer **generous free tiers**:

- Vercel: Free for personal projects
- Netlify: 100GB bandwidth/month free
- GitHub Pages: Free for public repositories
- Cloudflare Pages: Unlimited free requests
- Firebase: Free tier includes hosting
- Render: Free tier available

## 🎉 Recommended Setup

For the best experience, we recommend:

1. **For beginners**: Vercel (easiest, one-command deploy)
2. **For advanced users**: Netlify (more control, great CI/CD)
3. **For open-source**: GitHub Pages (integrated with repo)
4. **For global performance**: Cloudflare Pages (edge network)

---

## 🚀 Quick Start (TL;DR)

**Fastest deployment (Vercel)**:
```bash
npm install -g vercel
vercel
```

**Alternative (Netlify)**:
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

That's it! Your Web3 Wallet app is now live! 🎉

---

For questions or issues, please check the main README.md or open an issue on GitHub.