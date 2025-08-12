import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  login: (token: string, userData?: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setToken(
        parsedUser?.access_token || parsedUser?.user?.access_token || null
      );
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setToken(null);
  };

  // Optional helper to login and save token + user data
  const login = (newToken: string, userData?: any) => {
    const user = userData
      ? { access_token: newToken, user: userData }
      : { access_token: newToken };

    localStorage.setItem("user", JSON.stringify(user));
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

// import { createContext, useContext, useState, useEffect } from "react";

// interface AuthContextType {
//   token: string | null;
//   setToken: (token: string | null) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       const parsedUser = JSON.parse(userData);
//       setToken(
//         parsedUser?.access_token || parsedUser?.user?.access_token || null
//       );
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ token, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// }
