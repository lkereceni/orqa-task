import { useCallback, useState } from "react";
import type { User } from "../types";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const setAuthData = useCallback((token: string, user: User) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(user));
  }, []);

  const clearAuthData = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  }, []);

  const loadStoredAuth = useCallback(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return {
    user,
    token,
    setAuthData,
    clearAuthData,
    loadStoredAuth,
  };
};
