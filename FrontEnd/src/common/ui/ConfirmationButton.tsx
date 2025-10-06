import React, { useState } from "react";

type ConfirmationButtonProps = {
  children: React.ReactNode;
  buttonLabel: string;
  confirmTitle?: string;
  confirmMessage: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  className?: string;
};

export const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({ children, confirmTitle, confirmMessage, confirmText, cancelText, onConfirm, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={className}>
        {children}
      </button>

      <Confirmation isOpen={isOpen} title={confirmTitle} message={confirmMessage} confirmText={confirmText} cancelText={cancelText} onConfirm={handleConfirm} onCancel={() => setIsOpen(false)} />
    </>
  );
};

// Confirmation modal component
type ConfirmationProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function Confirmation({ isOpen, title = "Are you sure?", message, confirmText = "Yes", cancelText = "Cancel", onConfirm, onCancel }: ConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            {cancelText}
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
