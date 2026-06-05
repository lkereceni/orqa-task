import { useEffect } from "react";
import "../../../../../shared/components/Modals/Modals.css";
import useEditUserForm from "../../../hooks/useEditUserForm";
import type { UserData } from "../../../types";
import Card from "../../../../../shared/components/Card/Card";
import ModalHeader from "../../../../../shared/components/Modals/ModalHeader/ModalHeader";
import ModalFooter from "../../../../../shared/components/Modals/ModalFooter/ModalFooter";

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
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    populateForm,
  } = useEditUserForm();

  useEffect(() => {
    if (user && isOpen) {
      populateForm(user);
    }
  }, [user, isOpen, populateForm]);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFormSubmit = (e: React.SubmitEvent) => {
    if (!user) return;

    const updatedUser = handleSubmit(e, user);
    if (updatedUser) {
      onSave(updatedUser);
      handleClose();
    }
  };
  if (!isOpen || !user) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <Card className="modal-card">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <ModalHeader title="Edit User" onClose={handleClose} />

          <form onSubmit={handleFormSubmit}>
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
