import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("peerhive_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, role, name) => {
    const newUser = {
      id: Math.random().toString(36).substring(2, 11),
      email,
      role,
      name,
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60",
      department: "Computer Science",
    };

    sessionStorage.setItem("peerhive_user", JSON.stringify(newUser));
    setUser(newUser);
    setLocation("/dashboard");
  };

  const logout = () => {
    sessionStorage.removeItem("peerhive_user");
    setUser(null);
    setLocation("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}