import React from 'react';

import style from './ZodiacBlock.module.css';

const ZodiacBlock = ({ sign, dateRange, icon, onClick }) => {
  return (
    <div className={style.zodiacBlock} onClick={onClick}>
      <div>{icon}</div>
      <div className={style.zodiacInfo}>
        <h3>{sign}</h3>
        <p>{dateRange}</p>
      </div>
    </div>
  );
};

export default ZodiacBlock;
