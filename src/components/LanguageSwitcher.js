import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setLanguage } from '../redux/slices/languageSlice';

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en';
    dispatch(setLanguage(newLanguage));
  };

  return (
    <button className="button" onClick={toggleLanguage}>
      {language === 'ru' ? 'Переключить на английский' : 'Switch to Russian'}
    </button>
  );
};

export default LanguageSwitcher;
