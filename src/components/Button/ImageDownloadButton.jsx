import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons/faCloudArrowDown';
import { useAuth } from '../../context/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const ImageDownloadButton = ({ imageUrl }) => {
  console.log('image:', imageUrl);

  const { token } = useAuth();
  const navigate = useNavigate();
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      const contentType = response.headers.get('content-type');
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      if (!contentType || !contentType.startsWith('image')) {
        throw new Error('The URL does not point to a valid image.');
      }

      const blob = await response.blob();

      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'download.jpg'; // Set the file name for the download

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  return (
    // <button
    //   onClick={handleDownload}
    //   className="bg-blue-500 text-white px-4 py-2 rounded"
    // >
    //   Download Image
    // </button>
    <button onClick={token ? handleDownload : () => navigate('/login')}>
      <FontAwesomeIcon
        icon={faCloudArrowDown}
        className="text-white hover:text-dark-primary"
      />
    </button>
  );
};

ImageDownloadButton.propTypes = {
  imageUrl: PropTypes.string,
};

export default ImageDownloadButton;
