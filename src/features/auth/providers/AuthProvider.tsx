import { useCallback, useState, type PropsWithChildren } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAuthState } from "../hooks/useAuthState";
import { authService } from "../services/authService";

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const { user, token, setAuthData, clearAuthData } = useAuthState();
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const response = await authService.login(username, password);

        if (response.status === 200) {
          setAuthData(response.token, response.user);
        }
      } catch (error) {
        console.error("Login failed: ", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setAuthData],
  );

  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed: ", error);
    } finally {
      clearAuthData();
      setIsLoading(false);
    }
  }, [clearAuthData]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
