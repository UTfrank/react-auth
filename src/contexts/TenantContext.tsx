import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TenantConfig {
  id: string;
  name: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  domain: string;
  features: string[];
  branding: {
    companyName: string;
    tagline: string;
    supportEmail: string;
  };
}

interface TenantContextType {
  tenant: TenantConfig | null;
  setTenant: (tenant: TenantConfig) => void;
  isLoading: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

// Default tenant configurations
const defaultTenants: Record<string, TenantConfig> = {
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
  }
};

interface TenantProviderProps {
  children: ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Determine tenant based on URL, subdomain, or query parameter
    const determineTenant = () => {
      const hostname = window.location.hostname;
      const searchParams = new URLSearchParams(window.location.search);
      const tenantParam = searchParams.get('tenant');
      
      // Check for tenant parameter first
      if (tenantParam && defaultTenants[tenantParam]) {
        return defaultTenants[tenantParam];
      }
      
      // Check for subdomain
      const subdomain = hostname.split('.')[0];
      if (subdomain && defaultTenants[subdomain]) {
        return defaultTenants[subdomain];
      }
      
      // Default to twilio for demo purposes
      return defaultTenants['twilio'];
    };

    const selectedTenant = determineTenant();
    setTenant(selectedTenant);
    setIsLoading(false);

    // Apply tenant-specific CSS variables
    if (selectedTenant) {
      document.documentElement.style.setProperty('--primary-color', selectedTenant.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', selectedTenant.secondaryColor);
    }
  }, []);

  const value = {
    tenant,
    setTenant,
    isLoading
  };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = (): TenantContextType => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

export default TenantProvider;