import { useCallback } from "react";
import type { UserData } from "../types";

interface UseDeleteUserConfirmReturn {
  handleDelete: (user: UserData) => string;
}

export const useDeleteUserConfirm = (): UseDeleteUserConfirmReturn => {
  const handleDelete = useCallback((user: UserData) => {
    return user.id;
  }, []);

  return {
    handleDelete,
  };
};

export default useDeleteUserConfirm;
