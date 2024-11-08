import React, { useState } from "react";

const DeleteConfirmationModal = ({ isOpen, closeModal, onDelete }) => {
  const handleDelete = () => {
    onDelete();
    closeModal();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-black opacity-60 absolute inset-0"></div>
        <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative z-10">
          <h2 className="text-lg font-semibold mb-4">
            Are you sure you want to delete this reseller?
          </h2>
          <div className="flex justify-end space-x-4">
            <button
              onClick={closeModal}
              className="py-2 px-4 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteConfirmationModal;
