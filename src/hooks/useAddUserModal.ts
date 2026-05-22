import type React from "react";
import type { UserData } from "../types";
import { useCallback, useState } from "react";

interface UseAddUserModalReturn {
  isOpen: boolean;
  formData: {
    firstName: string;
    lastName: string;
    role: "admin" | "user" | "moderator";
  };
  errors: Record<string, string>;

  openModal: () => void;
  closeModal: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.FormEvent) => boolean;
  resetForm: () => void;

  newUser: UserData | null;
}

export const useAddUserModal = (): UseAddUserModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "user" as const,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newUser, setNewUser] = useState<UserData | null>(null);

  const resetForm = useCallback(() => {
    setFormData({
      firstName: "",
      lastName: "",
      role: "user",
    });
    setErrors({});
    setNewUser(null);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    resetForm();
  }, [resetForm]);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors],
  );

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return false;

      const user: UserData = {
        id: String(Date.now()),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        role: formData.role as "admin" | "user" | "moderator",
      };

      setNewUser(user);
      resetForm();
      setIsOpen(false);

      return true;
    },
    [formData, validateForm, resetForm],
  );

  return {
    isOpen,
    formData,
    errors,
    openModal,
    closeModal,
    handleChange,
    handleSubmit,
    resetForm,
    newUser,
  };
};

export default useAddUserModal;
