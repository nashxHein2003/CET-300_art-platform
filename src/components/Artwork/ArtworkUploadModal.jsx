// ArtUploadModal.js
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { supabaseClient } from '../../services/supaBase';

const ArtworkUploadModal = ({ isOpen, onClose, onUpload, userId }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title || !userId) return;

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `artworks/${fileName}`;

      let { data: storageData, error: storageError } =
        await supabaseClient.storage
          .from('artwork_bucker')
          .upload(filePath, file);

      if (storageError) {
        console.error('Error uploading file: ', storageError.message);
        return;
      }

      const imageUrl = supabaseClient.storage
        .from('artwork_bucker')
        .getPublicUrl(filePath).data.publicUrl;

      console.log(userId[0].id);

      const { data: insertData, error: insertError } = await supabaseClient
        .from('artwork')
        .insert([
          {
            user_id: userId[0].id,
            title,
            description,
            image_url: imageUrl,
          },
        ])
        .select();

      if (insertError) {
        console.error('Error inserting data: ', insertError.message);
        return;
      }

      const artworkId = insertData[0].artwork_id;

      const tagsArray = tags.split(',').map((tag) => tag.trim());
      if (tagsArray.length > 0) {
        const tagInserts = tagsArray.map((tag) => ({
          artwork_id: artworkId,
          tag_name: tag,
        }));

        const { error: tagsError } = await supabaseClient
          .from('artwork_tags')
          .insert(tagInserts);

        if (tagsError) {
          console.error('Error inserting tags: ', tagsError.message);
        }
      }

      onUpload({
        file,
        title,
        description,
        imageUrl,
        tags: tagsArray,
      });

      setFile(null);
      setTitle('');
      setDescription('');
      setTags('');

      onClose();
    } catch (error) {
      console.error('Error during upload: ', error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-dark-lighter-theme text-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/3">
        <span className="logo-text">CenturyArt</span>

        <form onSubmit={handleSubmit} className="mt-5 text-sm font-light">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="file">
              Select Art:
            </label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="border border-gray-300 rounded p-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border border-gray-300 rounded p-2 w-full text-black"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full h-24 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="tags">
              Tags (comma separated):
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full text-black"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded"
              onClick={onClose}
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArtworkUploadModal;

ArtworkUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
