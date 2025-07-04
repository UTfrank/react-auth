import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signUp, signIn, signOut, getCurrentUser, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';
import { useTenant } from './TenantContext';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  tenantId: string;
  attributes?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (userData: SignUpData) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<any>;
  resendConfirmationCode: (email: string) => Promise<any>;
}

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { tenant } = useTenant();

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        const userData: User = {
          id: currentUser.userId,
          email: currentUser.signInDetails?.loginId || '',
          firstName: currentUser.signInDetails?.loginId || '',
          lastName: '',
          tenantId: tenant?.id || 'default',
          attributes: currentUser
        };
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('No authenticated user');
    } finally {
      setIsLoading(false);
    }
  };

  const signUpUser = async (userData: SignUpData) => {
    try {
      const { email, password, firstName, lastName, phoneNumber } = userData;
      
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            given_name: firstName,
            family_name: lastName,
            'custom:tenant_id': tenant?.id || 'default',
            ...(phoneNumber && { phone_number: phoneNumber })
          }
        }
      });
      return result;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signInUser = async (email: string, password: string) => {
    try {
      const result = await signIn({ username: email, password });
      
      if (result.isSignedIn) {
        const currentUser = await getCurrentUser();
        const userData: User = {
          id: currentUser.userId,
          email: email,
          firstName: '',
          lastName: '',
          tenantId: tenant?.id || 'default',
          attributes: currentUser
        };
        setUser(userData);
        setIsAuthenticated(true);
      }
      
      return result;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const confirmSignUpUser = async (email: string, code: string) => {
    try {
      const result = await confirmSignUp({ username: email, confirmationCode: code });
      return result;
    } catch (error) {
      console.error('Confirm sign up error:', error);
      throw error;
    }
  };

  const resendConfirmationCode = async (email: string) => {
    try {
      const result = await resendSignUpCode({ username: email });
      return result;
    } catch (error) {
      console.error('Resend confirmation error:', error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    signUp: signUpUser,
    signIn: signInUser,
    signOut: signOutUser,
    confirmSignUp: confirmSignUpUser,
    resendConfirmationCode
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;