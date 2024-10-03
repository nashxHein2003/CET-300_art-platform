import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { fetchArt } from '../../../services/fetchArt';
import { Link } from 'react-router-dom';

const ArtworkGallery = () => {
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const getArt = async () => {
      setLoading(true);
      const data = await fetchArt();
      setArt(data);
      setLoading(false);
    };

    getArt();
  }, []);

  const handleResize = () => {
    if (!containerRef.current) return;

    const maxHeight = 230;
    const images = Array.from(containerRef.current.getElementsByTagName('img'));
    const rows = [];
    let currentRow = [];
    let totalWidth = 0;

    containerRef.current.innerHTML = '';

    images.forEach((image) => {
      totalWidth += (image.naturalWidth / image.naturalHeight) * maxHeight;
      currentRow.push(image);

      if (totalWidth > containerRef.current.clientWidth) {
        rows.push(currentRow);
        totalWidth = 0;
        currentRow = [];
      }
    });

    if (currentRow.length) {
      rows.push(currentRow);
    }

    rows.forEach((row) => {
      const rowDiv = document.createElement('div');
      rowDiv.style.display = 'flex';
      rowDiv.style.height = `${maxHeight}px`;
      rowDiv.className = 'gap-2';
      row.forEach((img) => rowDiv.appendChild(img));
      containerRef.current.appendChild(rowDiv);
    });
  };

  useLayoutEffect(() => {
    const debouncedResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(handleResize, 100);
    };

    handleResize();
    window.addEventListener('resize', debouncedResize);

    return () => {
      clearTimeout(window.resizeTimeout);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [art]);

  const handleImageLoad = () => {
    handleResize();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 h-full m-2 overflow-hidden">
      <div
        ref={containerRef}
        className="w-full h-full flex flex-row gap-2 flex-wrap items-start justify-start"
      >
        {art &&
          art.length > 0 &&
          art.map((artDetail) => (
            <Link
              key={artDetail.artwork_id}
              to={`/artworkDetail/${artDetail.artwork_id}`}
              className="overflow-hidden"
            >
              <img
                src={artDetail.image_url}
                alt={`Art piece #${artDetail.artwork_id}`}
                className="transition-transform duration-300 ease-in-out hover:brightness-50"
                onLoad={handleImageLoad}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ArtworkGallery;
