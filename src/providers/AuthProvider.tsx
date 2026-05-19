import { useEffect, useState, type PropsWithChildren } from "react";
import type { User } from "../types";
import { AuthContext } from "../context/AuthContext";
import { authService } from "../services/authService";

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await authService.login(username, password);

      if (response.status === 200) {
        setToken(response.token);
        setUser(response.user);

        localStorage.setItem("auth_token", response.token);
        localStorage.setItem("auth_user", JSON.stringify(response.user));
      }
    } catch (error) {
      console.error("Login failed: ", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      await authService.logout();

      setUser(null);
      setToken(null);

      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    } catch (error) {
      console.error("Logout failed: ", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
