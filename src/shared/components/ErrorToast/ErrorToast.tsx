import "./ErrorToast.css";
import { useEffect } from "react";
import { FaExclamationCircle, FaTimes } from "react-icons/fa";

interface ErrorToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const ErrorToast = ({ message, onClose, duration = 5000 }: ErrorToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="error-toast">
      <div className="error-toast-icon">
        <FaExclamationCircle />
      </div>

      <div className="error-toast-content">
        <p className="error-toast-message">{message}</p>
      </div>

      <button className="error-toast-close" onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  );
};

export default ErrorToast;
