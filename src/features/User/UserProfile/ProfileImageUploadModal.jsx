// CoverImageUploadModal.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProfileImageUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onUpload(file);
      setFile(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-dark-primary-theme text-white rounded-lg shadow-lg w-11/12 md:w-1/3 p-10 ">
        <h2 className="text-lg font-bold mb-4">Upload Profile Image</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="file">
              Select Profile Image:
            </label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-white text-gray-700 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-dark-primary text-white rounded"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProfileImageUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default ProfileImageUploadModal;
