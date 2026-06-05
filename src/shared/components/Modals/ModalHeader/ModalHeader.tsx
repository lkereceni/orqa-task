import "./ModalHeader.css";
import { FaX } from "react-icons/fa6";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className="modal-header">
      <h2>{title}</h2>
      <button className="modal-close" onClick={onClose} aria-label="Close">
        <FaX />
      </button>
    </div>
  );
};

export default ModalHeader;
