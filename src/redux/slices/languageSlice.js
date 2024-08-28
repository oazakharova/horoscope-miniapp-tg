import { createSlice } from '@reduxjs/toolkit';

const getDefaultLanguage = () => {
  if (
    typeof window !== 'undefined' &&
    window.Telegram &&
    window.Telegram.WebApp &&
    window.Telegram.WebApp.initDataUnsafe
  ) {
    const language = window.Telegram.WebApp.initDataUnsafe.language;
    if (language === 'ru') {
      return 'ru';
    }
  }
  return 'en';
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
