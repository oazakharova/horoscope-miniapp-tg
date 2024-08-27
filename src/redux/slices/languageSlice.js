import { createSlice } from '@reduxjs/toolkit';

const logToScreen = (message) => {
  const logElement = document.createElement('div');
  logElement.style.position = 'absolute';
  logElement.style.top = '0';
  logElement.style.left = '0';
  logElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  logElement.style.color = '#fff';
  logElement.style.padding = '5px';
  logElement.style.zIndex = '9999';
  logElement.innerText = message;

  document.body.appendChild(logElement);
};

const getDefaultLanguage = () => {
  const languageCode = window.Telegram.WebApp.initDataUnsafe.user.language_code;
  logToScreen(
    'Telegram WebApp initDataUnsafe language: ' + JSON.stringify(languageCode)
  );
  return languageCode === 'ru' ? 'ru' : 'en';
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
