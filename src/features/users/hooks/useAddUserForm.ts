import { useState, useCallback } from "react";
import type { UserData } from "../types";

interface UseAddUserFormReturn {
  formData: {
    firstName: string;
    lastName: string;
    role: "admin" | "user" | "moderator";
  };
  errors: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.SubmitEvent) => UserData | null;
  resetForm: () => void;
}

export const useAddUserForm = (): UseAddUserFormReturn => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "user" as const,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

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

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return null;
      }

      const newUser: UserData = {
        id: String(Date.now()),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        role: formData.role as "admin" | "user" | "moderator",
      };

      return newUser;
    },
    [formData, validateForm],
  );

  const resetForm = useCallback(() => {
    setFormData({
      firstName: "",
      lastName: "",
      role: "user",
    });
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useAddUserForm;
