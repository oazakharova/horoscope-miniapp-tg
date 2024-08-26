import { createSlice } from '@reduxjs/toolkit';

const getDefaultLanguage = () => {
  return navigator.language.startsWith('ru') ? 'ru' : 'en';
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
