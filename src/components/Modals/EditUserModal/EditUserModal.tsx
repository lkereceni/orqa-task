import "../Modals.css";
import React, { useEffect, useState } from "react";
import type { UserData } from "../../../types";
import Card from "../../CoreComponents/Card/Card";
import ModalHeader from "../Core/ModalHeader/ModalHeader";
import ModalFooter from "../Core/ModalFooter/ModalFooter";

interface EditUserModalProps {
  isOpen: boolean;
  user: UserData | null;
  onClose: () => void;
  onSave: (user: UserData) => void;
}

const EditUserModal = ({
  isOpen,
  user,
  onClose,
  onSave,
}: EditUserModalProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      });
      setErrors({});
    }
  }, [user, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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
  };

  const validateForm = (): boolean => {
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!user) {
      return;
    }

    const updatedUser: UserData = {
      id: user.id,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      role: formData.role as "admin" | "user" | "moderator",
    };

    onSave(updatedUser);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      role: "user",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <Card className="modal-card">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <ModalHeader title="Edit User" onClose={handleClose} />

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* First Name */}
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  className={`form-input ${errors.firstName ? "input-error" : ""}`}
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  className={`form-input ${errors.lastName ? "input-error" : ""}`}
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>

              {/* Role */}
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  className={`form-select ${errors.role ? "input-error" : ""}`}
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <span className="error-message">{errors.role}</span>
                )}
              </div>
            </div>

            <ModalFooter
              submitText="Edit User"
              submitType="submit"
              onCancel={handleClose}
            />
          </form>
        </div>
      </Card>
    </div>
  );
};

export default EditUserModal;
