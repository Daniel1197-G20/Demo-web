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
      // Prepared mock authentication (will integrate Supabase in Phase 2)
      const isAdmin = email.toLowerCase().includes('admin');
      const mockUser = {
        id: isAdmin ? 'admin-user-id-001' : 'customer-user-id-001',
        email,
      };
      const mockProfile = {
        id: mockUser.id,
        email,
        full_name: isAdmin ? 'Tory Admin' : 'Adaobi Okafor',
        role: isAdmin ? USER_ROLES.ADMIN : USER_ROLES.CUSTOMER,
        phone: '+234 802 345 6789',
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

  // Helper for quick testing/switching in Phase 1
  const toggleRole = () => {
    if (!profile) return;
    const newRole = profile.role === USER_ROLES.ADMIN ? USER_ROLES.CUSTOMER : USER_ROLES.ADMIN;
    const updatedProfile = { ...profile, role: newRole };
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
    signIn,
    signUp,
    signOut,
    toggleRole,
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
