import React from 'react';
import { useSelector } from 'react-redux';

import style from './ZodiacDetail.module.css';

const ZodiacDetail = ({ signDetail, onClose }) => {
  const language = useSelector((state) => state.language.language);

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
