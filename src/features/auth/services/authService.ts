import type { User } from "../types";

interface LoginResponse {
  status: number;
  token: string;
  user: User;
}

export const authService = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          token: `token_${Date.now()}`,
          user: {
            id: 1,
            username,
            password,
          },
        });
      }, 1000);
    });
  },

  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },
};
