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
  loading: boolean; // tambah loading flag
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setToken(parsedUser?.token || parsedUser?.user?.token || null);
    }
    setLoading(false); // selesai load token
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setToken(null);
  };

  const login = (newToken: string, userData?: any) => {
    const user = userData
      ? { token: newToken, user: userData }
      : { token: newToken };
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
