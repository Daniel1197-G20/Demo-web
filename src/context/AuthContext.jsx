import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_ROLES } from '../lib/constants';

const AuthContext = createContext(null);

const MOCK_STORAGE_KEY = 'torys_treats_auth_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage (or prepare for Supabase auth)
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(MOCK_STORAGE_KEY);
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        setUser(parsed.user);
        setProfile(parsed.profile);
      }
    } catch (e) {
      console.error('Failed to load auth session:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = async (email, password) => {
    setIsLoading(true);
    try {
      // Check role mapping
      const isDev = email.toLowerCase().includes('dev');
      const isAdmin = !isDev && email.toLowerCase().includes('admin');
      
      const mockUser = {
        id: isDev ? 'dev-user-id-001' : (isAdmin ? 'admin-user-id-001' : 'customer-user-id-001'),
        email,
      };
      
      const mockProfile = {
        id: mockUser.id,
        email,
        full_name: isDev ? 'Lead DevSecOps Engineer' : (isAdmin ? 'Tory Admin' : 'Adaobi Okafor'),
        role: isDev ? USER_ROLES.DEVELOPER : (isAdmin ? USER_ROLES.ADMIN : USER_ROLES.CUSTOMER),
        phone: '+234 903 835 8985',
        city: 'Lagos',
      };

      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem(
        MOCK_STORAGE_KEY,
        JSON.stringify({ user: mockUser, profile: mockProfile })
      );
      return { success: true, user: mockUser, profile: mockProfile };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signInDeveloper = async (email, password) => {
    setIsLoading(true);
    try {
      const devEmail = email || 'dev@torystreats.com';
      const devUser = {
        id: 'dev-user-id-001',
        email: devEmail,
      };
      const devProfile = {
        id: devUser.id,
        email: devEmail,
        full_name: 'Lead DevSecOps Engineer',
        role: USER_ROLES.DEVELOPER,
        phone: '+234 903 835 8985',
        city: 'Lagos',
      };

      setUser(devUser);
      setProfile(devProfile);
      localStorage.setItem(
        MOCK_STORAGE_KEY,
        JSON.stringify({ user: devUser, profile: devProfile })
      );
      return { success: true, user: devUser, profile: devProfile };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email, password, fullName) => {
    setIsLoading(true);
    try {
      const mockUser = {
        id: 'new-customer-' + Math.random().toString(36).substring(2, 7),
        email,
      };
      const mockProfile = {
        id: mockUser.id,
        email,
        full_name: fullName || 'New Customer',
        role: USER_ROLES.CUSTOMER,
        phone: '',
        city: 'Lagos',
      };

      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem(
        MOCK_STORAGE_KEY,
        JSON.stringify({ user: mockUser, profile: mockProfile })
      );
      return { success: true, user: mockUser, profile: mockProfile };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem(MOCK_STORAGE_KEY);
  };

  // Helper for quick testing/switching in dev prototype
  const toggleRole = () => {
    if (!profile) return;
    let newRole = USER_ROLES.CUSTOMER;
    if (profile.role === USER_ROLES.CUSTOMER) newRole = USER_ROLES.ADMIN;
    else if (profile.role === USER_ROLES.ADMIN) newRole = USER_ROLES.DEVELOPER;
    else newRole = USER_ROLES.CUSTOMER;

    const updatedProfile = { 
      ...profile, 
      role: newRole,
      full_name: newRole === USER_ROLES.DEVELOPER ? 'Lead DevSecOps Engineer' : (newRole === USER_ROLES.ADMIN ? 'Tory Admin' : 'Adaobi Okafor')
    };
    setProfile(updatedProfile);
    localStorage.setItem(
      MOCK_STORAGE_KEY,
      JSON.stringify({ user, profile: updatedProfile })
    );
  };

  const setExplicitRole = (targetRole) => {
    if (!profile && !user) {
      const dummyUser = { id: 'user-' + targetRole.toLowerCase(), email: `${targetRole.toLowerCase()}@torystreats.com` };
      const dummyProfile = {
        id: dummyUser.id,
        email: dummyUser.email,
        full_name: targetRole === USER_ROLES.DEVELOPER ? 'Lead DevSecOps Engineer' : (targetRole === USER_ROLES.ADMIN ? 'Tory Admin' : 'Adaobi Okafor'),
        role: targetRole,
      };
      setUser(dummyUser);
      setProfile(dummyProfile);
      localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify({ user: dummyUser, profile: dummyProfile }));
      return;
    }
    const updatedProfile = { 
      ...profile, 
      role: targetRole,
      full_name: targetRole === USER_ROLES.DEVELOPER ? 'Lead DevSecOps Engineer' : (targetRole === USER_ROLES.ADMIN ? 'Tory Admin' : 'Adaobi Okafor')
    };
    setProfile(updatedProfile);
    localStorage.setItem(
      MOCK_STORAGE_KEY,
      JSON.stringify({ user, profile: updatedProfile })
    );
  };

  const value = {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: profile?.role === USER_ROLES.ADMIN || profile?.role === USER_ROLES.SUPER_ADMIN,
    isDeveloper: profile?.role === USER_ROLES.DEVELOPER || profile?.role === USER_ROLES.SUPER_ADMIN,
    signIn,
    signInDeveloper,
    signUp,
    signOut,
    toggleRole,
    setExplicitRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

