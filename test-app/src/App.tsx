import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

// Import the multi-tenant auth system from parent directory
import AuthProvider from '../src/contexts/AuthContext';
import TenantProvider from '../src/contexts/TenantContext';
import SignUpForm from '../src/components/Auth/SignUpForm';
import LoginForm from '../src/components/Auth/LoginForm';
import Dashboard from '../src/components/Dashboard/Dashboard';
import TenantTester from './components/TenantTester';
import './App.css';

// Configure Amplify (you'll need to replace with your actual config)
const amplifyConfig = {
  Auth: {
    Cognito: {
      region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
      userPoolId: process.env.REACT_APP_USER_POOL_ID || '',
      userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID || '',
    },
  },
  API: {
    REST: {
      api: {
        endpoint: process.env.REACT_APP_API_ENDPOINT || '',
        region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
      },
    },
  },
};

Amplify.configure(amplifyConfig);

function App() {
  return (
    <TenantProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/test" element={<TenantTester />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Navigate to="/test" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </TenantProvider>
  );
}

export default App;