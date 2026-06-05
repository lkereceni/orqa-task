import Card from "../../../../../shared/components/Card/Card";
import ModalFooter from "../../../../../shared/components/Modals/ModalFooter/ModalFooter";
import ModalHeader from "../../../../../shared/components/Modals/ModalHeader/ModalHeader";
import "../../../../../shared/components/Modals/Modals.css";
import useDeleteUserConfirm from "../../../hooks/useDeleteUserConfirm";
import type { UserData } from "../../../types";

interface DeleteUserModalProps {
  isOpen: boolean;
  user: UserData | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

const DeleteUserModal = ({
  isOpen,
  user,
  onDelete,
  onClose,
  isDeleting,
}: DeleteUserModalProps) => {
  const handleClose = () => {
    onClose();
  };

  const { handleDelete } = useDeleteUserConfirm();

  const handleDeleteClick = () => {
    if (user) {
      const userId = handleDelete(user);
      onDelete(userId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <Card className="modal-card">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <ModalHeader title="Delete User" onClose={handleClose} />

          <div className="modal-body">
            <p>Are you sure you want to delete user?</p>
          </div>

          <ModalFooter
            submitText="Delete User"
            submitType="button"
            onCancel={handleClose}
            onSubmit={handleDeleteClick}
            isSubmitting={isDeleting}
          />
        </div>
      </Card>
    </div>
  );
};

export default DeleteUserModal;
