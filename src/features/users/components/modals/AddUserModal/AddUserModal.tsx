import Card from "../../../../../shared/components/Card/Card";
import ModalFooter from "../../../../../shared/components/Modals/ModalFooter/ModalFooter";
import ModalHeader from "../../../../../shared/components/Modals/ModalHeader/ModalHeader";
import "../../../../../shared/components/Modals/Modals.css";
import useAddUserForm from "../../../hooks/useAddUserForm";
import type { UserData } from "../../../types";

interface AddUserModalProps {
  isOpen: boolean;
  onAddUser: (user: UserData) => void;
  onClose: () => void;
}

const AddUserModal = ({ isOpen, onAddUser, onClose }: AddUserModalProps) => {
  const { formData, errors, handleChange, handleSubmit, resetForm } =
    useAddUserForm();

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFormSubmit = (e: React.SubmitEvent) => {
    const newUser = handleSubmit(e);
    if (newUser) {
      onAddUser(newUser);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <Card className="modal-card">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <ModalHeader title="Add New User" onClose={handleClose} />

          <form onSubmit={handleFormSubmit}>
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
              onCancel={handleClose}
            />
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AddUserModal;
