# Testing Guide

This guide provides comprehensive testing instructions for the Web3 Wallet application.

## 🧪 Testing Checklist

### Prerequisites
- [ ] MetaMask browser extension installed
- [ ] Ethereum Mainnet RPC access (via MetaMask)
- [ ] Test wallet with some ETH/USDT (optional but recommended)

---

## 🔧 Local Development Testing

### 1. Start Development Server

```bash
npm install
npm run dev
```

The app should be available at `http://localhost:5173`

### 2. Basic Functionality Tests

#### Test 1: Initial Load
- [ ] Page loads without errors
- [ ] "Connect Wallet" button is visible
- [ ] Wallet icon animation plays smoothly
- [ ] No console errors

**Expected Result**: Clean interface with connect button centered

---

#### Test 2: MetaMask Not Installed
- [ ] Test in browser without MetaMask
- [ ] Should show "Install MetaMask" link
- [ ] Link should open MetaMask download page

**Expected Result**: Clear message with link to install MetaMask

---

#### Test 3: Connect Wallet (Happy Path)
1. [ ] Click "Connect Wallet" button
2. [ ] MetaMask popup appears
3. [ ] Select account and click "Next" → "Connect"
4. [ ] Wallet address appears (truncated format)
5. [ ] ETH balance displays
6. [ ] USDT balance displays
7. [ ] "Disconnect Wallet" button appears

**Expected Result**: Wallet connected, balances displayed correctly

---

#### Test 4: Wrong Network
1. [ ] Connect wallet
2. [ ] Switch MetaMask to another network (e.g., Polygon)
3. [ ] Try to connect or refresh page

**Expected Result**: Error message "Please switch to Ethereum Mainnet in MetaMask."

---

#### Test 5: Account Switching
1. [ ] Connect wallet
2. [ ] Switch to different account in MetaMask
3. [ ] Check if address updates
4. [ ] Check if balances update

**Expected Result**: Address and balances update automatically

---

#### Test 6: Network Switching
1. [ ] Connect wallet on Mainnet
2. [ ] Switch network in MetaMask
3. [ ] Check app behavior

**Expected Result**: Page reloads automatically

---

#### Test 7: Disconnect Wallet
1. [ ] Connect wallet
2. [ ] Click "Disconnect Wallet" button
3. [ ] Verify return to initial state

**Expected Result**: Returns to connect screen, all data cleared

---

#### Test 8: Disconnect via MetaMask
1. [ ] Connect wallet
2. [ ] Disconnect from MetaMask extension
3. [ ] Check app state

**Expected Result**: App detects disconnection and resets

---

#### Test 9: Reject Connection
1. [ ] Click "Connect Wallet"
2. [ ] Reject the connection in MetaMask popup

**Expected Result**: Error message appears, app remains in disconnected state

---

#### Test 10: Balance Display Accuracy
1. [ ] Connect wallet with known balances
2. [ ] Compare displayed balances with MetaMask
3. [ ] Verify ETH shows 6 decimals
4. [ ] Verify USDT shows 2 decimals

**Expected Result**: Balances match MetaMask exactly

---

## 📱 Responsive Design Testing

### Desktop (1920x1080)
- [ ] Layout centered
- [ ] All text readable
- [ ] Buttons appropriately sized
- [ ] No horizontal scroll

### Tablet (768x1024)
- [ ] Container scales properly
- [ ] Touch targets large enough
- [ ] No overflow issues

### Mobile (375x667 - iPhone SE)
- [ ] All content visible
- [ ] Buttons full width
- [ ] Text sizes appropriate
- [ ] Balance cards stack vertically

### Mobile (320x568 - iPhone 5)
- [ ] Minimum screen size support
- [ ] No text cutoff
- [ ] All features accessible

---

## 🎨 UI/UX Testing

### Visual Tests
- [ ] Colors consistent with design
- [ ] Gradients render smoothly
- [ ] Shadows appear correctly
- [ ] Border radius consistent
- [ ] Icons display properly

### Animation Tests
- [ ] Wallet icon float animation smooth
- [ ] Button hover effects work
- [ ] Card hover effects work
- [ ] Fade-in animations on load
- [ ] Slide-in animation when connected
- [ ] Error shake animation

### Accessibility Tests
- [ ] Buttons have clear labels
- [ ] Error messages are readable
- [ ] Color contrast sufficient
- [ ] Focus states visible
- [ ] Keyboard navigation works

---

## 🌐 Browser Compatibility

### Chrome/Brave (Recommended)
- [ ] Full functionality works
- [ ] MetaMask integrates properly
- [ ] Animations smooth

### Firefox
- [ ] Connect wallet works
- [ ] Balances display correctly
- [ ] UI renders properly

### Edge
- [ ] MetaMask connection works
- [ ] All features functional

### Safari
- [ ] Wallet connection works
- [ ] Gradients render correctly
- [ ] No webkit-specific issues

---

## ⚠️ Error Handling Tests

### Test 1: Network Errors
- [ ] Disconnect internet
- [ ] Try to connect wallet
- [ ] Check error message clarity

### Test 2: RPC Errors
- [ ] Simulate slow/failed RPC calls
- [ ] Verify graceful error handling

### Test 3: Invalid Account
- [ ] Test with empty account (0 balance)
- [ ] Verify displays "0.000000" properly

### Test 4: Contract Call Failures
- [ ] Test USDT balance fetch failure
- [ ] Verify error message appears

---

## 🔒 Security Tests

### Test 1: No Private Key Exposure
- [ ] Check console logs
- [ ] Inspect network requests
- [ ] Verify no sensitive data stored

### Test 2: Read-Only Access
- [ ] Confirm no transaction signatures requested
- [ ] Verify only `eth_requestAccounts` is called
- [ ] Check no write operations to blockchain

### Test 3: Safe Error Messages
- [ ] Error messages don't expose sensitive info
- [ ] No stack traces shown to user

---

## 🚀 Production Build Testing

### Build Test
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] Bundle size reasonable (<500KB)

### Preview Test
```bash
npm run preview
```
- [ ] Production build runs locally
- [ ] All features work in production mode
- [ ] No console warnings

---

## 📊 Performance Tests

### Load Time
- [ ] Initial page load < 2 seconds
- [ ] Time to interactive < 3 seconds
- [ ] Bundle loads efficiently

### Runtime Performance
- [ ] Smooth animations (60fps)
- [ ] Quick wallet connection
- [ ] Fast balance fetching
- [ ] No memory leaks

### Network Requests
- [ ] Minimal RPC calls
- [ ] Efficient contract queries
- [ ] No unnecessary re-renders

---

## 🎯 Edge Cases

### Test 1: Multiple Quick Connects
1. [ ] Click connect multiple times rapidly
2. [ ] Verify no duplicate connections

### Test 2: Rapid Account Switching
1. [ ] Switch accounts rapidly in MetaMask
2. [ ] Verify app handles updates correctly

### Test 3: Empty Balance
- [ ] Test with account having 0 ETH and 0 USDT
- [ ] Verify displays zeros properly

### Test 4: Very Large Balance
- [ ] Test with account having large balances
- [ ] Verify number formatting works

### Test 5: Very Small Balance
- [ ] Test with dust amounts (0.000001 ETH)
- [ ] Verify decimal precision

---

## 📝 Manual Test Scenarios

### Scenario 1: First-Time User
1. User has never used MetaMask
2. Installs extension
3. Creates wallet
4. Connects to app
5. Views balances

**Expected**: Smooth onboarding experience

### Scenario 2: Experienced User
1. User has MetaMask with multiple accounts
2. Connects to app
3. Switches between accounts
4. Views different balances

**Expected**: Seamless account switching

### Scenario 3: Mobile User
1. User on mobile browser with MetaMask mobile
2. Opens app
3. Connects wallet
4. Views balances

**Expected**: Full functionality on mobile

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- [ ] All tests pass
- [ ] No console errors in production build
- [ ] Build size optimized
- [ ] All animations smooth
- [ ] Responsive on all devices
- [ ] Works in all major browsers
- [ ] Error messages are user-friendly
- [ ] Documentation is complete
- [ ] README includes deployment URL

---

## 🐛 Known Issues / Limitations

### Current Limitations
1. **Mainnet Only**: Only supports Ethereum Mainnet
2. **MetaMask Only**: Requires MetaMask (doesn't support WalletConnect, etc.)
3. **Two Tokens Only**: Shows ETH and USDT only
4. **No Transaction History**: Doesn't show past transactions

### Future Improvements
- [ ] Support multiple networks (Polygon, Arbitrum, etc.)
- [ ] Support multiple wallet providers
- [ ] Add more token support
- [ ] Add transaction history
- [ ] Add token price in USD
- [ ] Add portfolio value calculation

---

## 📞 Reporting Issues

If you find any issues during testing:

1. **Document the issue**:
   - What you were doing
   - What you expected
   - What actually happened
   - Browser and OS version
   - MetaMask version

2. **Reproduce the issue**:
   - Try to reproduce it
   - Note the steps to reproduce

3. **Check console**:
   - Open browser developer tools
   - Check for error messages
   - Take screenshot if needed

---

## 🎉 Testing Complete!

Once all tests pass, you're ready to deploy! 🚀

For deployment instructions, see `DEPLOYMENT.md`.

---

**Last Updated**: 2024
**Test Coverage**: Manual testing guide
**Automation**: Not yet implemented (future improvement)