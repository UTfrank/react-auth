import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTenant } from '../../contexts/TenantContext';
// import { FaCheckCircle } from "react-icons/fa";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  agreeToTerms?: string;
}

const SignUpForm: React.FC = () => {
  const { signUp } = useAuth();
  const { tenant } = useTenant();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber
      });
      
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Sign up error:', error);
      setErrors({ email: error.message || 'An error occurred during sign up' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // Implement Google OAuth sign up
    console.log('Google sign up clicked');
  };

  if (!tenant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="auth-container">
      <div className="auth-form-section">
        <div className="auth-form-section-container">
        <div className="logo">
          <div className="logo-icon" style={{ background: tenant.primaryColor }}>
            {tenant.name.charAt(0)}
          </div>
          <div className="logo-text" style={{ color: tenant.primaryColor }}>
            {tenant.name}
          </div>
        </div>
        
        <h1 className="form-title">Sign up for free</h1>
        <p className="form-subtitle">
          Start your free trial and unlock all {tenant.branding.companyName} products,
          including {tenant.branding.companyName} SendGrid and {tenant.branding.companyName} Segment.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className={`form-input ${formData.firstName && !errors.firstName ? 'success' : ''}`}
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {formData.firstName && !errors.firstName && (
                <span className="success-indicator">✓</span>
              )}
            </div>
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>
          
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className={`form-input ${formData.lastName && !errors.lastName ? 'success' : ''}`}
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {formData.lastName && !errors.lastName && (
                <span className="success-indicator">✓</span>
              )}
            </div>
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>
          
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                placeholder="Email address*"
                className={`form-input ${formData.email && !errors.email ? 'success' : ''}`}
                value={formData.email}
                onChange={handleInputChange}
              />
              {formData.email && !errors.email && (
                <span className="success-indicator">✓</span>
              )}
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password*"
                className={`form-input ${formData.password && !errors.password ? 'success' : ''}`}
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
              {formData.password && !errors.password && (
                <span className="success-indicator">✓</span>
              )}
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          {showSuccess && (
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  value="Success!"
                  className="form-input success"
                  readOnly
                />
                <span className="success-indicator">✓</span>
              </div>
            </div>
          )}
          
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
            />
            <span>
              By clicking Continue, you agree to the{' '}
              <a href="#" target="_blank">Terms of Service</a>.
              If you are in the EU, you are also agreeing to the{' '}
              <a href="#" target="_blank">Data Processing Agreement</a> and
              agree to the{' '}
              <a href="#" target="_blank">Electronic Communications Code
              Disclosure</a>, if applicable.
            </span>
          </div>
          {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
          
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Continue'}
          </button>
        </form>
        
        <div className="auth-links">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <button className="google-button" onClick={handleGoogleSignUp}>
          <svg className="google-icon" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign up with Google
        </button>
        </div>
      </div>
      
      <div className="auth-info-section">
        <h2 className="info-title">{tenant.branding.tagline}</h2>
        
        <ul className="feature-list">
          <li>
            <p>No credit card required</p>
          </li>
          <li>
            <p>Free trials available</p>
          </li>
          <li>
            <p>Access to all products across the {tenant.branding.companyName} platform</p>
          </li>
        </ul>
        
        <div className="setup-steps">
          <h4>Get up and running:</h4>
          <div className="step">
            <span className="step-number">1</span>
            Verify your email address & phone number
          </div>
          <div className="step">
            <span className="step-number">2</span>
            Tell us what you want to build first
          </div>
          <div className="step">
            <span className="step-number">3</span>
            Start building!
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;