import React, { useEffect } from 'react';

import style from './ZodiacDetail.module.css';

const ZodiacDetail = ({ signDetail, onClose }) => {
  useEffect(() => {
    const handleSwipe = (event) => {
      if (event.type === 'swiped-right') {
        onClose();
      }
    };

    window.addEventListener('swiped-right', handleSwipe);

    return () => {
      window.removeEventListener('swiped-right', handleSwipe);
    };
  }, [onClose]);

  return (
    <div className={style.zodiacDetail}>
      <h2>{signDetail.sign}</h2>
      <p>{signDetail.horoscope}</p>
    </div>
  );
};

export default ZodiacDetail;
