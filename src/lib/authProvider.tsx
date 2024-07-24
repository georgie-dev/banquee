'use client'
import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from "next/navigation";

// Define types for the context values
interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
  activeMenu: boolean;
  setActiveMenu: (value: boolean) => void;
  screenSize: number | undefined;
  setScreenSize: (value: number | undefined) => void;
}

// Define the initial context value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
  activeMenu: true,
  setActiveMenu: () => {},
  screenSize: undefined,
  setScreenSize: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    auth.signOut();
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };