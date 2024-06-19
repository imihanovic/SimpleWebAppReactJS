import React from "react";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='z-10 bg-white p-8 rounded shadow-md'>
        <h2 className='text-xl font-bold mb-4'>{title}</h2>
        <p className='mb-4'>{children}</p>
        <div className='flex justify-end'>
          <button
            className='bg-gray-300 px-4 py-2 mr-2 rounded hover:bg-gray-400'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
