import { useState, useCallback } from "react";
import type { UserData } from "../types";

interface UseEditUserFormReturn {
  formData: {
    firstName: string;
    lastName: string;
    role: "admin" | "user" | "moderator" | "";
  };
  errors: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.SubmitEvent, user: UserData) => UserData | null;
  resetForm: () => void;
  populateForm: (user: UserData) => void;
}

export const useEditUserForm = (): UseEditUserFormReturn => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "" as "admin" | "user" | "moderator" | "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const populateForm = useCallback((user: UserData) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as "admin" | "user" | "moderator" | "",
    });
    setErrors({});
  }, []);

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

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    (e: React.SubmitEvent, user: UserData) => {
      e.preventDefault();

      if (!validateForm()) {
        return null;
      }

      const updatedUser: UserData = {
        id: user.id,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        role: formData.role as "admin" | "user" | "moderator",
      };

      return updatedUser;
    },
    [formData, validateForm],
  );

  const resetForm = useCallback(() => {
    setFormData({
      firstName: "",
      lastName: "",
      role: "",
    });
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    populateForm,
  };
};

export default useEditUserForm;
