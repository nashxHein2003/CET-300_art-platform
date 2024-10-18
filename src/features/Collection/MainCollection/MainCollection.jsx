import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import useTag from '../../../hooks/Tag/useTag';
import useArtworkByTag from '../../../hooks/Artwork/useArtworkByTag';
import { Link } from 'react-router-dom';
import useArtwork from '../../../hooks/Artwork/useArtwork';

const MainCollection = () => {
  const containerRef = useRef(null);
  const { tag } = useTag();
  const [selectedTag, setSelectedTag] = useState('All');
  const { artwork, loading } = useArtworkByTag(selectedTag);
  const { artwork: arts } = useArtwork();
  const [rows, setRows] = useState([]);

  // Normalize and filter unique tags
  const uniqueTags = tag
    ? tag.reduce((acc, currTag) => {
        const normalizedTag = currTag.tag_name
          .toLowerCase()
          .replace(/\s+/g, '');
        if (!acc.some((t) => t.normalizedTag === normalizedTag)) {
          acc.push({ ...currTag, normalizedTag });
        }
        return acc;
      }, [])
    : [];

  // Handle tag selection
  const handleTagSelect = (tagName) => {
    setSelectedTag(tagName);
  };

  const handleResize = useCallback(() => {
    const artworkToUse = selectedTag === 'All' ? arts : artwork;

    if (!artworkToUse || artworkToUse.length === 0) return;

    const maxHeight = 210;
    let totalWidth = 0;
    let currentRow = [];
    const newRows = [];

    artworkToUse.flat().forEach((art) => {
      const imageAspectRatio = art.width / art.height;
      totalWidth += imageAspectRatio * maxHeight;
      currentRow.push(art);

      if (totalWidth > window.innerWidth) {
        newRows.push(currentRow);
        totalWidth = 0;
        currentRow = [];
      }
    });

    if (currentRow.length) {
      newRows.push(currentRow);
    }

    setRows(newRows);
  }, [artwork, arts, selectedTag]);

  // Debounced resize event
  useLayoutEffect(() => {
    const debouncedResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(handleResize, 200);
    };

    handleResize(); // Call initially to layout the artwork
    window.addEventListener('resize', debouncedResize);

    return () => {
      clearTimeout(window.resizeTimeout);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [handleResize]);

  const handleImageLoad = () => {
    handleResize();
  };

  return (
    <>
      <div className="w-full h-auto flex flex-col">
        {/* Tags Filter */}
        <div className="w-full h-auto flex flex-row fixed bg-dark-lighter-theme py-2 z-10">
          <button
            className={`text-sm border-2 text-white px-4 py-2 rounded mr-2 hover:bg-dark-primary-hover ${
              selectedTag === 'All' ? 'border-dark-primary' : 'border-gray-600'
            }`}
            onClick={() => handleTagSelect('All')}
          >
            All
          </button>
          {uniqueTags &&
            uniqueTags.length > 0 &&
            uniqueTags.map((tags) => (
              <button
                key={tags.tag_id}
                className={`text-sm border-2 text-white px-4 py-2 rounded mr-2 hover:bg-dark-primary-hover ${
                  selectedTag === tags.tag_name
                    ? 'border-dark-primary'
                    : 'border-gray-600'
                }`}
                onClick={() => handleTagSelect(tags.tag_name)}
              >
                {tags.tag_name}
              </button>
            ))}
        </div>

        {/* Artworks */}
        <div
          ref={containerRef}
          className="w-full h-full flex flex-col gap-2 mt-10"
        >
          {loading ? (
            <div className="mt-10 text-white">Loading...</div>
          ) : (
            rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-row gap-2">
                {row.map((art) => (
                  <Link
                    key={art.artwork_id}
                    to={`/artworkDetail/${art.artwork_id}`}
                    className="overflow-hidden"
                  >
                    <img
                      src={art.image_url}
                      alt={`Art piece #${art.artwork_id}`}
                      className="transition-transform duration-300 ease-in-out hover:brightness-50"
                      onLoad={handleImageLoad}
                      style={{ height: '210px' }}
                    />
                  </Link>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MainCollection;
