import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("webiecellar");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "webie_user@gmail.com" && pass === "123123123") {
          const fakeUser = {
            name: "Mr. Webie",
            email: email,
            avatar:
              "https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?q=80&w=200&auto=format&fit=crop",
          };
          setUser(fakeUser);
          localStorage.setItem("webiecellar", JSON.stringify(fakeUser));
          resolve(true);
        } else {
          resolve(false);
        }
        setIsLoading(false);
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("coastalspirits");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
