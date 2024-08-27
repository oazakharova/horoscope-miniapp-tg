import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import style from './ZodiacDetail.module.css';

const ZodiacDetail = ({ signDetail, onClose }) => {
  const language = useSelector((state) => state.language.language);

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
      <button className="button" onClick={onClose}>
        {language === 'ru' ? 'Назад' : 'Back'}
      </button>
      <h2>{signDetail.sign}</h2>
      <p>{signDetail.horoscope}</p>
    </div>
  );
};

export default ZodiacDetail;
