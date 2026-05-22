import "./ModalFooter.css";

interface ModalFooterProps {
  cancelText?: string;
  submitText?: string;
  onCancel: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  submitType?: "button" | "submit";
}

const ModalFooter = ({
  cancelText = "Cancel",
  submitText = "Submit",
  onCancel,
  onSubmit,
  isSubmitting = false,
  submitType = "submit",
}: ModalFooterProps) => {
  return (
    <div className="modal-footer">
      <button
        type="button"
        className="btn-secondary"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        {cancelText}
      </button>
      <button type={submitType} onClick={onSubmit} disabled={isSubmitting}>
        {submitText}
      </button>
    </div>
  );
};

export default ModalFooter;
