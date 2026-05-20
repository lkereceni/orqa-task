import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
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

  const login = useCallback(async (username: string, password: string) => {
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
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed: ", error);
    } finally {
      setUser(null);
      setToken(null);
      setIsLoading(false);

      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
