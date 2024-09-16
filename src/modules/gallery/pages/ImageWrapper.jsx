import React, { useEffect, useState } from 'react';
import { fetchArt } from '../../../api/fetchArt';
import { Link } from 'react-router-dom';

const ImageWrapper = () => {
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArt = async () => {
      setLoading(true);
      const data = await fetchArt();
      setArt(data);
      setLoading(false);
    };

    getArt();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 h-full">
      <div className="w-full h-full flex flex-row gap-2 flex-wrap items-start justify-start">
        {art &&
          art.length > 0 &&
          art.map((artDetail) => (
            <Link
              key={artDetail.artwork_id}
              to={`/artdetail/${artDetail.artwork_id}`}
              className="h-60  flex-shrink flex-grow group overflow-hidden max-w-md"
            >
              <img
                src={artDetail.image_url}
                alt={`Art piece #${artDetail.artwork_id}`}
                className="h-full w-full object-cover transition group-hover:scale-105 brightness-90"
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ImageWrapper;
