# Web3 Wallet - MetaMask Integration

A modern, responsive Web3 application that allows users to connect their MetaMask wallet and view their ETH and USDT balances on Ethereum Mainnet.

## 🚀 Features

- **MetaMask Integration**: Seamless connection to MetaMask wallet
- **Balance Display**: View your ETH and USDT balances on Ethereum Mainnet
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Updates**: Automatically updates when you switch accounts or networks
- **Error Handling**: Graceful handling of connection errors and network mismatches
- **Clean UI/UX**: Modern, intuitive interface with smooth animations

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Web3 Library**: ethers.js v6
- **Styling**: Standard CSS (no frameworks)
- **Package Manager**: npm/bun

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher) installed
- MetaMask browser extension installed
- An Ethereum wallet with some ETH/USDT (for testing)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd web3-metamask-wallet
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## 🏗️ Building for Production

Build the application:

```bash
npm run build
```

The built files will be in the `dist` directory.

Preview the production build:

```bash
npm run preview
```

## 📦 Deployment

This application can be deployed to various platforms:

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify via:
   - Netlify CLI
   - Drag & drop on netlify.com
   - Git integration

### GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Update `vite.config.ts` with base URL:
```typescript
export default defineConfig({
  base: '/repository-name/',
  // ... other config
})
```

4. Deploy:
```bash
npm run deploy
```

## 🎯 How It Works

1. **Connect Wallet**: Click the "Connect Wallet" button to initiate MetaMask connection
2. **Network Check**: The app verifies you're on Ethereum Mainnet (chainId: 1)
3. **Fetch Balances**: 
   - ETH balance is fetched using `provider.getBalance()`
   - USDT balance is fetched by calling the USDT contract's `balanceOf()` function
4. **Display**: Balances are formatted and displayed in a clean interface
5. **Real-time Updates**: The app listens for account and network changes

## 🔐 Security Notes

- This app only reads blockchain data (balances)
- No private keys or sensitive data are stored
- No transactions are initiated
- Always verify you're on the correct network before connecting

## 🧪 Testing

To test the application:

1. Make sure MetaMask is installed and you're logged in
2. Switch to Ethereum Mainnet in MetaMask
3. Connect your wallet
4. Verify that your ETH and USDT balances display correctly

## 📝 Smart Contract Information

- **USDT Contract Address**: `0xdAC17F958D2ee523a2206206994597C13D831ec7`
- **Network**: Ethereum Mainnet (chainId: 1)
- **USDT Decimals**: 6

## 🐛 Troubleshooting

### "MetaMask is not installed"
- Install MetaMask browser extension from [metamask.io](https://metamask.io/download/)

### "Please switch to Ethereum Mainnet"
- Open MetaMask and switch to Ethereum Mainnet network

### Balance shows 0.000000
- Ensure you have ETH/USDT in your wallet
- Verify you're connected to the correct account
- Check that you're on Ethereum Mainnet

### Connection fails
- Refresh the page and try again
- Make sure MetaMask is unlocked
- Check browser console for detailed error messages

## 📄 License

MIT License - feel free to use this project for learning or production.

## 👨‍💻 Development

This project was built as a test assignment to demonstrate:
- Quick development with modern tools
- Web3 integration skills
- Clean code organization
- Responsive UI/UX design
- Error handling and edge cases

Built with ❤️ using React, TypeScript, and ethers.js