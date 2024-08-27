import { createSlice } from '@reduxjs/toolkit';

const getDefaultLanguage = () => {
  const language = window.Telegram.WebApp.initDataUnsafe.language;
  console.log(language);
  return language === 'ru' ? 'ru' : 'en';
};

const initialState = {
  language: getDefaultLanguage(),
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
