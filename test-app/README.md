# Multi-Tenant Authentication Test Application

This test application demonstrates and validates the multi-tenant authentication system built with React, AWS Amplify, and TypeScript.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- AWS Account with Cognito User Pool configured
- Parent multi-tenant auth system in `../src/`

### Installation

1. **Install Dependencies**
   ```bash
   cd test-app
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your AWS Cognito configuration
   ```

3. **Start the Test Application**
   ```bash
   npm start
   ```

4. **Open Browser**
   Navigate to `http://localhost:3000`

## 🧪 Testing Features

### 1. **Multi-Tenant Switching**
The test app provides three pre-configured tenants:

- **Twilio** (`?tenant=twilio`)
  - Red/Pink color scheme
  - Twilio branding and messaging
  - Features: SMS, Voice, Video, Email

- **Default** (`?tenant=default`)
  - Blue color scheme
  - Generic company branding
  - Features: Auth, Dashboard

- **StartupXYZ** (`?tenant=startup`)
  - Red/Teal color scheme
  - Startup branding
  - Features: Auth, Dashboard, Analytics

### 2. **URL Parameter Testing**
Test tenant switching via URL parameters:
```
http://localhost:3000?tenant=twilio
http://localhost:3000?tenant=default
http://localhost:3000?tenant=startup
```

### 3. **Visual Verification**
Watch for these changes when switching tenants:
- ✅ Primary and secondary colors
- ✅ Company name and tagline
- ✅ Support email addresses
- ✅ Feature lists
- ✅ CSS variable updates

### 4. **Authentication Flow Testing**
Test the complete authentication flow:
1. Click "Test Login Form" → Verify tenant-specific styling
2. Click "Test Signup Form" → Verify tenant isolation in user attributes
3. Click "Test Dashboard" → Verify authenticated user experience

### 5. **Automated Test Suite**
Run the built-in automated tests:
1. Click "🤖 Run Automated Tests"
2. Watch the terminal output for test results
3. Verify all tests pass with ✅ indicators

## 🔧 Test Scenarios

### Scenario 1: Basic Tenant Switching
```bash
1. Load the test app
2. Click "Twilio" button
3. Verify red color scheme appears
4. Click "Default" button
5. Verify blue color scheme appears
6. Check terminal for success messages
```

### Scenario 2: URL-Based Tenant Detection
```bash
1. Open: http://localhost:3000?tenant=twilio
2. Verify Twilio branding loads automatically
3. Open: http://localhost:3000?tenant=default
4. Verify Default branding loads automatically
```

### Scenario 3: Authentication Integration
```bash
1. Switch to "Twilio" tenant
2. Navigate to login form
3. Verify Twilio branding in auth forms
4. Attempt login (if configured)
5. Verify user.tenantId matches "twilio"
```

### Scenario 4: Responsive Design
```bash
1. Resize browser window
2. Test on mobile viewport
3. Verify buttons stack properly
4. Verify text remains readable
```

## 📊 Expected Test Results

When running automated tests, you should see:

```
✅ Switched to tenant: Twilio
🎨 Verified Twilio branding applied
✅ Switched to tenant: Default App
🎨 Verified Default branding applied
✅ Switched to tenant: StartupXYZ
🎨 Verified StartupXYZ branding applied
✅ All tenant switching tests passed!
🔧 Multi-tenant system is working correctly
```

## 🐛 Troubleshooting

### Common Issues

**1. "Cannot resolve '../src/contexts/AuthContext'"**
- Ensure the parent auth system exists in `../src/`
- Check file paths in imports

**2. "AWS Amplify configuration error"**
- Verify `.env` file has correct AWS credentials
- Check Cognito User Pool settings

**3. "Tenant not switching"**
- Check browser console for errors
- Verify CSS variables are updating
- Clear browser cache

**4. "Styles not applying"**
- Ensure CSS variables are defined
- Check for conflicting styles
- Verify tenant configuration object

### Debug Mode
Enable debug logging:
```bash
# In .env file
REACT_APP_DEBUG_MODE=true
REACT_APP_LOG_LEVEL=debug
```

## 🏗️ Architecture

### File Structure
```
test-app/
├── src/
│   ├── components/
│   │   └── TenantTester.tsx    # Main test interface
│   ├── App.tsx                 # App wrapper with routing
│   ├── App.css                 # Test app styles
│   └── index.tsx               # Entry point
├── public/
│   └── index.html              # HTML template
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── .env.example                # Environment template
└── README.md                   # This file
```

### Dependencies
- **React 18+**: UI framework
- **React Router**: Navigation
- **AWS Amplify**: Authentication
- **TypeScript**: Type safety
- **Parent Auth System**: Multi-tenant logic

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
1. **AWS Amplify Hosting**
2. **Netlify**
3. **Vercel**
4. **Traditional web server**

### Environment Variables
Ensure production environment has:
- `REACT_APP_AWS_REGION`
- `REACT_APP_USER_POOL_ID`
- `REACT_APP_USER_POOL_CLIENT_ID`

## 📈 Performance Testing

### Metrics to Monitor
- Tenant switching speed (< 100ms)
- CSS variable update time
- Component re-render count
- Memory usage during switching

### Load Testing
```bash
# Test rapid tenant switching
for i in {1..100}; do
  curl "http://localhost:3000?tenant=twilio"
  curl "http://localhost:3000?tenant=default"
done
```

## 🔒 Security Testing

### Test Cases
1. **Tenant Isolation**: Verify users can't access other tenant data
2. **URL Manipulation**: Test invalid tenant parameters
3. **XSS Prevention**: Test malicious tenant configurations
4. **CSRF Protection**: Verify authentication tokens

## 📝 Contributing

### Adding New Test Scenarios
1. Edit `TenantTester.tsx`
2. Add new test functions
3. Update UI with new test buttons
4. Document in this README

### Adding New Tenants
1. Update `availableTenants` object
2. Add tenant configuration
3. Test switching functionality
4. Verify visual changes

## 📞 Support

For issues with the test application:
1. Check browser console for errors
2. Verify parent auth system is working
3. Review AWS Amplify configuration
4. Test with different browsers

---

**Happy Testing! 🎉**

This test application validates that your multi-tenant authentication system is working correctly and ready for production use.