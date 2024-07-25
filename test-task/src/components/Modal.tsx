import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-5/6">
        <button
          onClick={onClose}
          className="float-right font-mono text-red-500 mb-2"
        >
          [close]
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
