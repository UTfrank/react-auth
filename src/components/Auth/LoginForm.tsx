import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTenant } from '../../contexts/TenantContext';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm: React.FC = () => {
  const { signIn } = useAuth();
  const { tenant } = useTenant();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'password'>('email');

  const validateEmail = (): boolean => {
    if (!formData.email.trim()) {
      setErrors({ email: 'Email is required' });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validatePassword = (): boolean => {
    if (!formData.password) {
      setErrors({ password: 'Password is required' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail()) {
      setStep('password');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signIn(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Sign in error:', error);
      let errorMessage = 'An error occurred during sign in';
      
      if (error.code === 'NotAuthorizedException') {
        errorMessage = 'Incorrect email or password';
      } else if (error.code === 'UserNotConfirmedException') {
        errorMessage = 'Please confirm your email address before signing in';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setErrors({});
  };

  if (!tenant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="auth-container" style={{
      height: '100vh',
      flexDirection: 'column'
    }}>
      <div className="auth-form-section" style={{
      margin: '0 auto'
    }}>
      <div className="auth-form-section-container">
        <div className="logo">
          <div className="logo-icon" style={{ background: tenant.primaryColor }}>
            {tenant.name.charAt(0)}
          </div>
          <div className="logo-text" style={{ color: tenant.primaryColor }}>
            {tenant.name}
          </div>
        </div>
        
        <h1 className="form-title" style={{ textAlign: 'center' }}>Log in</h1>
        
        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                autoFocus
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <button
              type="submit"
              className="submit-button"
            >
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={formData.email}
                className="form-input"
                readOnly
                style={{ background: '#f8f9fa', color: '#6c757d' }}
              />
              <button
                type="button"
                onClick={handleBackToEmail}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: tenant.primaryColor,
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Edit
              </button>
            </div>
            
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
                value={formData.password}
                onChange={handleInputChange}
                autoFocus
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
            
            {errors.general && (
              <div className="error-text" style={{ marginBottom: '20px', textAlign: 'center' }}>
                {errors.general}
              </div>
            )}
            
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
              style={{ background: tenant.primaryColor }}
            >
              {isLoading ? 'Signing in...' : 'Continue'}
            </button>
          </form>
        )}
        
        <div className="auth-links">
          Don't have an account? <Link to="/signup">Sign up</Link>.
        </div>
        
        
        </div>
      </div>
      
      <div style={{ textAlign: 'center', fontSize: '14px', color: '#7f8c8d' }}>
          Login to <a href="#">Twilio SendGrid</a> | Login to <a href="#">Twilio Segment</a>
        </div>
      
    </div>
  );
};

export default LoginForm;