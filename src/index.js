import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useSelector } from 'react-redux';
import {
  initMiniApp,
  initMainButton,
  mockTelegramEnv,
  parseInitData,
  initUtils,
} from '@telegram-apps/sdk';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { store } from './redux/store';

const TelegramInit = () => {
  const [isShareButtonEnabled, setIsShareButtonEnabled] = useState(false);
  const language = useSelector((state) => state.language.language);

  useEffect(() => {
    const initializeTelegramSDK = async () => {
      try {
        console.log('Инициализация окружения Telegram');
        const [miniApp] = initMiniApp();
        await miniApp.ready();
      } catch (error) {
        console.error('Ошибка при инициализации Telegram:', error);

        const initDataRaw = new URLSearchParams([
          [
            'user',
            JSON.stringify({
              id: 99281932,
              first_name: 'Andrew',
              last_name: 'Rogue',
              username: 'rogue',
              language_code: 'en',
              is_premium: true,
              allows_write_to_pm: true,
            }),
          ],
          [
            'hash',
            '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31',
          ],
          ['auth_date', '1716922846'],
          ['start_param', 'debug'],
          ['chat_type', 'sender'],
          ['chat_instance', '8428209589180549439'],
        ]).toString();

        mockTelegramEnv({
          themeParams: {
            accentTextColor: '#6ab2f2',
            bgColor: '#17212b',
            buttonColor: '#5288c1',
            buttonTextColor: '#ffffff',
            destructiveTextColor: '#ec3942',
            headerBgColor: '#fcb69f',
            hintColor: '#708499',
            linkColor: '#6ab3f3',
            secondaryBgColor: '#232e3c',
            sectionBgColor: '#17212b',
            sectionHeaderTextColor: '#6ab3f3',
            subtitleTextColor: '#708499',
            textColor: '#f5f5f5',
          },
          initData: parseInitData(initDataRaw),
          initDataRaw,
          version: '7.2',
          platform: 'tdesktop',
        });

        console.log('Mock Telegram environment initialized');
      }
    };

    initializeTelegramSDK();

    // Инициализация главной кнопки
    const [mainButton] = initMainButton();
    mainButton.setParams({
      backgroundColor: '#2e1a47',
      text: language === 'ru' ? 'Поделиться гороскопом' : 'Share Horoscope',
      isVisible: true,
      isEnabled: isShareButtonEnabled,
    });
    mainButton.show();

    const utils = initUtils();

    mainButton.on('click', () => {
      try {
        const horoscopeData = JSON.parse(localStorage.getItem('horoscopeData'));
        if (horoscopeData) {
          const { horoscope } = horoscopeData;
          const botLink = 'https://t.me/MyHoroscope123123123Bot';
          const message = `
            ${
              language === 'ru'
                ? 'Мой гороскоп на сегодня:'
                : 'My daily horoscope:'
            }
            ${horoscope}
            ${
              language === 'ru'
                ? 'Узнай свой гороскоп на сегодня в боте'
                : 'Check your horoscope for today by the bot'
            } (${botLink})
`;

          utils.shareURL(message);
          console.log('Окно выбора чата открыто для отправки сообщения.');
        } else {
          console.log('Гороскоп не выбран или не загружен.');
        }
      } catch (error) {
        console.error('Ошибка при открытии окна выбора чата:', error);
      }
    });
  }, [language, isShareButtonEnabled]);

  useEffect(() => {
    // Обновляем состояние кнопки при изменении выбранного гороскопа
    const updateShareButtonState = () => {
      const horoscopeData = localStorage.getItem('horoscopeData');
      setIsShareButtonEnabled(!!horoscopeData);
    };

    updateShareButtonState();
  }, []);

  return null;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <TelegramInit />
    <App />
  </Provider>
);
