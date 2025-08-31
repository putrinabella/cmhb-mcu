import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface CompanyData {
  id: string;
  name?: string;
}

export interface UserData {
  id: string;
  email: string;
  token: string;
  name: string;
  position: string;
  department: string;
  phone_number: string;
  role: string;
  company?: CompanyData | null;
}

interface AuthContextType {
  token: string | null;
  user: UserData | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  login: (token: string, userData: UserData) => void; // 2 argumen
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed: UserData = JSON.parse(stored);
        setUser(parsed);
        setToken(parsed.token);
      } catch (e) {
        console.error("Gagal parsing localStorage user:", e);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const login = (newToken: string, userData: UserData) => {
    const newUser: UserData = {
      ...userData,
      token: newToken,
      company: userData.company
        ? { id: userData.company.id, name: userData.company.name }
        : null,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, setToken, logout, login, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
