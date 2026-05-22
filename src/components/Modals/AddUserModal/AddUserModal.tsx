import "../Modals.css";
import type { UserData } from "../../../types";
import React, { useState } from "react";
import Card from "../../CoreComponents/Card/Card";
import ModalHeader from "../Core/ModalHeader/ModalHeader";
import ModalFooter from "../Core/ModalFooter/ModalFooter";

interface AddUserModalProps {
  isOpen: boolean;
  onAddUser: (user: UserData) => void;
  onClose: () => void;
}

const AddUserModal = ({ isOpen, onAddUser, onClose }: AddUserModalProps) => {
  const [formData, setFormData] = useState<UserData>({
    id: "",
    firstName: "",
    lastName: "",
    role: "user" as const,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateForm = () => {
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
  };

  const handleReset = () => {
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      role: "user",
    });
    setErrors({});
    onClose();
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newUser: UserData = {
      id: String(Date.now()),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      role: formData.role as "admin" | "user" | "moderator",
    };

    onAddUser(newUser);
    handleReset();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleReset}>
      <Card className="modal-card">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <ModalHeader title="Add New User" onClose={handleReset} />

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
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
              submitText="Add User"
              submitType="submit"
              onCancel={handleReset}
            />
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AddUserModal;
