# Multi-Tenant React Authentication System

A reusable, multi-tenant authentication system built with React, TypeScript, and AWS Amplify. This project replicates the Twilio authentication UI and provides a flexible foundation for building multi-tenant applications.

## Features

- 🎨 **Multi-tenant UI**: Customizable branding per tenant (colors, logos, messaging)
- 🔐 **Secure Authentication**: AWS Amplify + Cognito integration
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔄 **Reusable Components**: Easy to integrate into multiple applications
- 🏢 **Tenant Isolation**: Proper data and user isolation per tenant
- ⚡ **Modern Stack**: React 18, TypeScript, AWS Amplify

## Screenshots

The application replicates the Twilio authentication experience with:
- Beautiful sign-up form with validation
- Step-by-step login process
- Tenant-specific branding and messaging
- Responsive design for all screen sizes

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- AWS Account with Amplify CLI configured
- Basic knowledge of React and AWS services

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd reactapm
   npm install
   ```

2. **Set up AWS Amplify:**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   amplify init
   ```

3. **Add authentication:**
   ```bash
   amplify add auth
   ```
   Choose the following options:
   - Default configuration with Social Provider
   - Username (keep default)
   - Add custom attributes: `custom:tenant_id`

4. **Deploy to AWS:**
   ```bash
   amplify push
   ```

5. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your AWS configuration values in `.env.local`

6. **Start the development server:**
   ```bash
   npm start
   ```

## Multi-Tenant Configuration

### Adding New Tenants

Edit `src/contexts/TenantContext.tsx` to add new tenant configurations:

```typescript
const defaultTenants: Record<string, TenantConfig> = {
  'your-tenant': {
    id: 'your-tenant',
    name: 'Your Company',
    primaryColor: '#your-color',
    secondaryColor: '#your-secondary-color',
    domain: 'yourcompany.com',
    features: ['auth', 'dashboard'],
    branding: {
      companyName: 'Your Company Name',
      tagline: 'Your custom tagline',
      supportEmail: 'support@yourcompany.com'
    }
  }
};
```

### Tenant Detection

The system automatically detects tenants based on:
1. URL query parameter: `?tenant=twilio`
2. Subdomain: `twilio.yourapp.com`
3. Falls back to default tenant

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── SignUpForm.tsx     # Sign-up form component
│   │   └── LoginForm.tsx      # Login form component
│   └── Dashboard/
│       └── Dashboard.tsx      # Protected dashboard
├── contexts/
│   ├── AuthContext.tsx        # Authentication state management
│   └── TenantContext.tsx      # Multi-tenant configuration
├── App.tsx                    # Main application component
├── App.css                    # Global styles
└── index.tsx                  # Application entry point
```

## Customization

### Styling

The application uses CSS custom properties for tenant-specific theming:

```css
:root {
  --primary-color: #e74c3c;
  --secondary-color: #f093fb;
}
```

These are automatically updated based on the current tenant configuration.

### Adding Features

1. **New Authentication Methods**: Extend the `AuthContext` to add social logins or SSO
2. **Custom Validation**: Modify form validation in the auth components
3. **Additional User Fields**: Update the Cognito user pool and form components
4. **Tenant-Specific Features**: Use the `tenant.features` array to conditionally render components

## AWS Amplify Setup Details

### Cognito Configuration

When setting up Amplify auth, ensure you:

1. **Add custom attributes:**
   - `custom:tenant_id` (String, Mutable)

2. **Configure sign-up attributes:**
   - Email (required)
   - Given name (required)
   - Family name (required)

3. **Set up verification:**
   - Email verification enabled
   - Phone verification optional

### Security Considerations

- User data is isolated by `tenant_id`
- All API calls should include tenant context
- Implement proper authorization rules in your backend
- Use Cognito groups for role-based access control

## Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Deploy with Amplify Hosting
```bash
amplify add hosting
amplify publish
```

## Integration Guide

### Using in Existing Applications

1. **Copy the authentication components:**
   ```bash
   cp -r src/components/Auth /your-app/src/components/
   cp -r src/contexts /your-app/src/
   ```

2. **Install dependencies:**
   ```bash
   npm install aws-amplify @aws-amplify/ui-react
   ```

3. **Configure Amplify in your app:**
   ```typescript
   import { Amplify } from 'aws-amplify';
   import awsconfig from './aws-exports';
   
   Amplify.configure(awsconfig);
   ```

4. **Wrap your app with providers:**
   ```typescript
   <TenantProvider>
     <AuthProvider>
       <YourApp />
     </AuthProvider>
   </TenantProvider>
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this in your projects!

## Support

For questions or issues:
1. Check the AWS Amplify documentation
2. Review the code comments
3. Open an issue in the repository

---

**Built with ❤️ for the developer community**