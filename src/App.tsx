import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import AuthProvider from "./contexts/AuthContext";
import TenantProvider from "./contexts/TenantContext";
import SignUpForm from "./components/Auth/SignUpForm";
import LoginForm from "./components/Auth/LoginForm";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

// Configure Amplify (you'll need to replace with your actual config)
const amplifyConfig = {
  Auth: {
    Cognito: {
      region: process.env.REACT_APP_AWS_REGION || "us-east-1",
      userPoolId: process.env.REACT_APP_USER_POOL_ID || "",
      userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID || "",
    },
  },
  API: {
    REST: {
      api: {
        endpoint: process.env.REACT_APP_API_ENDPOINT || "",
        region: process.env.REACT_APP_AWS_REGION || "us-east-1",
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
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </TenantProvider>
  );
}

export default App;
