import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTenant } from '../../contexts/TenantContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { tenant } = useTenant();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!user || !tenant) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e1e8ed'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: tenant.primaryColor,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              marginRight: '16px'
            }}>
              {tenant.name.charAt(0)}
            </div>
            <div>
              <h1 style={{ color: tenant.primaryColor, margin: 0 }}>{tenant.branding.companyName}</h1>
              <p style={{ color: '#7f8c8d', margin: 0, fontSize: '14px' }}>Tenant: {tenant.id}</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontWeight: '600' }}>{user.firstName} {user.lastName}</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#7f8c8d' }}>{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                border: `2px solid ${tenant.primaryColor}`,
                borderRadius: '6px',
                color: tenant.primaryColor,
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Sign Out
            </button>
          </div>
        </header>
        
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Welcome to your Dashboard!</h2>
          <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
            You have successfully signed in to the multi-tenant authentication system. 
            This dashboard demonstrates the reusable authentication components that can be 
            customized for different tenants and applications.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: '#f8f9fa',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #e1e8ed'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '16px' }}>User Information</h3>
            <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>First Name:</strong> {user.firstName}</p>
              <p><strong>Last Name:</strong> {user.lastName}</p>
              <p><strong>Tenant ID:</strong> {user.tenantId}</p>
            </div>
          </div>
          
          <div style={{
            background: '#f8f9fa',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid #e1e8ed'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '16px' }}>Tenant Configuration</h3>
            <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
              <p><strong>Name:</strong> {tenant.name}</p>
              <p><strong>Domain:</strong> {tenant.domain}</p>
              <p><strong>Primary Color:</strong> <span style={{ color: tenant.primaryColor }}>{tenant.primaryColor}</span></p>
              <p><strong>Features:</strong> {tenant.features.join(', ')}</p>
            </div>
          </div>
        </div>
        
        <div style={{
          background: `linear-gradient(135deg, ${tenant.secondaryColor}20 0%, ${tenant.primaryColor}20 100%)`,
          padding: '24px',
          borderRadius: '8px',
          border: `1px solid ${tenant.primaryColor}30`
        }}>
          <h3 style={{ color: tenant.primaryColor, marginBottom: '16px' }}>Multi-Tenant Features</h3>
          <ul style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
            <li>🎨 <strong>Customizable Branding:</strong> Each tenant can have their own colors, logo, and messaging</li>
            <li>🔐 <strong>Secure Authentication:</strong> AWS Amplify integration with Cognito for robust security</li>
            <li>🏢 <strong>Tenant Isolation:</strong> Data and users are properly isolated per tenant</li>
            <li>📱 <strong>Responsive Design:</strong> Works seamlessly across desktop and mobile devices</li>
            <li>🔄 <strong>Reusable Components:</strong> Easy to integrate into multiple applications</li>
            <li>⚡ <strong>Modern Stack:</strong> Built with React, TypeScript, and AWS Amplify</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;