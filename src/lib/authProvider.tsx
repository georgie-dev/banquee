'use client';
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { auth } from './firebase';
import { ref, child, get } from 'firebase/database';
import { db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  logout: () => Promise<void>;
  activeMenu: boolean;
  setActiveMenu: (value: boolean) => void;
  screenSize: number | undefined;
  setScreenSize: (value: number | undefined) => void;
  fetchUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export interface Transaction {
    id: string;
    description: string;
    to: string;
    amount: string;
    type: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  accountNumber: string;
  balance: number;
  income:number;
  expenses:number;
  savings:number;
  phone: string;
  pin: number;
  firstTimeUser: boolean;
  transactions: Record<string, Transaction>;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        await fetchUserData(currentUser.uid);
      } else {
        setUserData(null);
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('userData');
        }
      }
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserData = async (uid?: string) => {
    try {
      if (!uid && user) uid = user.uid;
      if (!uid) return;

      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `users/${uid}`));

      if (snapshot.exists()) {
        // console.log('User data:', snapshot.val());
        setUserData(snapshot.val());
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('userData', JSON.stringify(snapshot.val()));
        }
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      router.push('/');
      setUserData(null);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('userData');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        loading,
        logout,
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
