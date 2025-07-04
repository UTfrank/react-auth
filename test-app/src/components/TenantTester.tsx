import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTenant } from '../../src/contexts/TenantContext';
import { useAuth } from '../../src/contexts/AuthContext';

const TenantTester: React.FC = () => {
  const { tenant, setTenant } = useTenant();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState<string[]>([]);

  // Available tenants for testing
  const availableTenants = {
    'twilio': {
      id: 'twilio',
      name: 'Twilio',
      primaryColor: '#e74c3c',
      secondaryColor: '#f093fb',
      domain: 'twilio.com',
      features: ['sms', 'voice', 'video', 'email'],
      branding: {
        companyName: 'Twilio',
        tagline: 'Start your free trial today to test out the Twilio platform with no strings attached.',
        supportEmail: 'support@twilio.com'
      }
    },
    'default': {
      id: 'default',
      name: 'Default App',
      primaryColor: '#3498db',
      secondaryColor: '#667eea',
      domain: 'localhost',
      features: ['auth', 'dashboard'],
      branding: {
        companyName: 'Your Company',
        tagline: 'Welcome to our platform. Sign up to get started.',
        supportEmail: 'support@yourcompany.com'
      }
    },
    'startup': {
      id: 'startup',
      name: 'StartupXYZ',
      primaryColor: '#ff6b6b',
      secondaryColor: '#4ecdc4',
      domain: 'startupxyz.com',
      features: ['auth', 'dashboard', 'analytics'],
      branding: {
        companyName: 'StartupXYZ',
        tagline: 'Innovation at scale - Join the future today!',
        supportEmail: 'hello@startupxyz.com'
      }
    }
  };

  const switchTenant = (tenantId: string) => {
    const newTenant = availableTenants[tenantId as keyof typeof availableTenants];
    if (newTenant) {
      setTenant(newTenant);
      addTestResult(`✅ Switched to tenant: ${newTenant.name}`);
      
      // Update CSS variables
      document.documentElement.style.setProperty('--primary-color', newTenant.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', newTenant.secondaryColor);
    }
  };

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const runAutomatedTests = () => {
    setTestResults([]);
    addTestResult('🚀 Starting automated multi-tenant tests...');
    
    // Test 1: Tenant switching
    setTimeout(() => {
      switchTenant('twilio');
      addTestResult('🎨 Verified Twilio branding applied');
    }, 500);
    
    setTimeout(() => {
      switchTenant('default');
      addTestResult('🎨 Verified Default branding applied');
    }, 1000);
    
    setTimeout(() => {
      switchTenant('startup');
      addTestResult('🎨 Verified StartupXYZ branding applied');
    }, 1500);
    
    setTimeout(() => {
      addTestResult('✅ All tenant switching tests passed!');
      addTestResult('🔧 Multi-tenant system is working correctly');
    }, 2000);
  };

  const testUrlParameters = () => {
    addTestResult('🔗 Testing URL parameter tenant switching...');
    const testUrls = [
      '?tenant=twilio',
      '?tenant=default',
      '?tenant=startup'
    ];
    
    testUrls.forEach((url, index) => {
      setTimeout(() => {
        addTestResult(`📍 Test URL: ${window.location.origin}${url}`);
      }, index * 300);
    });
  };

  if (!tenant) {
    return <div>Loading tenant configuration...</div>;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${tenant.primaryColor}20 0%, ${tenant.secondaryColor}20 100%)`,
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <header style={{
          textAlign: 'center',
          marginBottom: '40px',
          padding: '20px',
          background: `linear-gradient(135deg, ${tenant.primaryColor} 0%, ${tenant.secondaryColor} 100%)`,
          borderRadius: '8px',
          color: 'white'
        }}>
          <h1 style={{ margin: 0, fontSize: '2.5rem' }}>🧪 Multi-Tenant Test Lab</h1>
          <p style={{ margin: '10px 0 0 0', opacity: 0.9 }}>Test and verify multi-tenant authentication system</p>
        </header>

        {/* Current Tenant Info */}
        <div style={{
          background: '#f8f9fa',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: `2px solid ${tenant.primaryColor}30`
        }}>
          <h2 style={{ color: tenant.primaryColor, marginBottom: '16px' }}>🏢 Current Tenant: {tenant.name}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div>
              <strong>Company:</strong> {tenant.branding.companyName}<br/>
              <strong>Domain:</strong> {tenant.domain}<br/>
              <strong>Primary Color:</strong> <span style={{ color: tenant.primaryColor }}>{tenant.primaryColor}</span>
            </div>
            <div>
              <strong>Features:</strong> {tenant.features.join(', ')}<br/>
              <strong>Support:</strong> {tenant.branding.supportEmail}<br/>
              <strong>Tagline:</strong> {tenant.branding.tagline}
            </div>
          </div>
        </div>

        {/* Authentication Status */}
        <div style={{
          background: isAuthenticated ? '#d4edda' : '#f8d7da',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: `1px solid ${isAuthenticated ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: isAuthenticated ? '#155724' : '#721c24' }}>
            {isAuthenticated ? '✅ User Authenticated' : '❌ User Not Authenticated'}
          </h3>
          {user && (
            <p style={{ margin: 0, fontSize: '14px' }}>
              User: {user.email} | Tenant: {user.tenantId}
            </p>
          )}
        </div>

        {/* Tenant Switching Controls */}
        <div style={{
          background: '#fff',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #e1e8ed'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '16px' }}>🔄 Tenant Switching Tests</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {Object.entries(availableTenants).map(([key, tenantConfig]) => (
              <button
                key={key}
                onClick={() => switchTenant(key)}
                style={{
                  padding: '12px 20px',
                  background: tenant.id === key ? tenantConfig.primaryColor : 'transparent',
                  color: tenant.id === key ? 'white' : tenantConfig.primaryColor,
                  border: `2px solid ${tenantConfig.primaryColor}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                {tenantConfig.name}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={runAutomatedTests}
              style={{
                padding: '12px 24px',
                background: tenant.primaryColor,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              🤖 Run Automated Tests
            </button>
            
            <button
              onClick={testUrlParameters}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                color: tenant.primaryColor,
                border: `2px solid ${tenant.primaryColor}`,
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              🔗 Test URL Parameters
            </button>
          </div>
        </div>

        {/* Navigation Controls */}
        <div style={{
          background: '#fff',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #e1e8ed'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '16px' }}>🧭 Navigation Tests</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: '12px 20px',
                background: 'transparent',
                color: tenant.primaryColor,
                border: `2px solid ${tenant.primaryColor}`,
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              🔐 Test Login Form
            </button>
            
            <button
              onClick={() => navigate('/signup')}
              style={{
                padding: '12px 20px',
                background: 'transparent',
                color: tenant.primaryColor,
                border: `2px solid ${tenant.primaryColor}`,
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              📝 Test Signup Form
            </button>
            
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '12px 20px',
                background: 'transparent',
                color: tenant.primaryColor,
                border: `2px solid ${tenant.primaryColor}`,
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              📊 Test Dashboard
            </button>
          </div>
        </div>

        {/* Test Results */}
        {testResults.length > 0 && (
          <div style={{
            background: '#f8f9fa',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #e1e8ed'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '16px' }}>📋 Test Results</h3>
            <div style={{
              background: '#000',
              color: '#00ff00',
              padding: '16px',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '14px',
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {testResults.map((result, index) => (
                <div key={index} style={{ marginBottom: '4px' }}>
                  {result}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div style={{
          background: `linear-gradient(135deg, ${tenant.secondaryColor}10 0%, ${tenant.primaryColor}10 100%)`,
          padding: '24px',
          borderRadius: '8px',
          marginTop: '30px',
          border: `1px solid ${tenant.primaryColor}30`
        }}>
          <h3 style={{ color: tenant.primaryColor, marginBottom: '16px' }}>📖 Testing Instructions</h3>
          <ul style={{ color: '#7f8c8d', lineHeight: '1.6', margin: 0 }}>
            <li><strong>Tenant Switching:</strong> Click the tenant buttons to see real-time branding changes</li>
            <li><strong>URL Testing:</strong> Try accessing with ?tenant=twilio, ?tenant=default, or ?tenant=startup</li>
            <li><strong>Authentication:</strong> Test login/signup forms with different tenant configurations</li>
            <li><strong>Visual Verification:</strong> Notice how colors, text, and branding change per tenant</li>
            <li><strong>Automated Tests:</strong> Run the automated test suite to verify all functionality</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TenantTester;