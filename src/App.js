import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  GiAries,
  GiTaurus,
  GiGemini,
  GiCancer,
  GiLeo,
  GiVirgo,
  GiLibra,
  GiScorpio,
  GiSagittarius,
  GiCapricorn,
  GiAquarius,
  GiPisces,
} from 'react-icons/gi';

import './App.css';
import LanguageSwitcher from './components/LanguageSwitcher';
import ZodiacDetail from './components/ZodiacDetail';
import ZodiacBlock from './components/ZodiacBlock';

const App = () => {
  const [selectedSign, setSelectedSign] = useState(null);
  const language = useSelector((state) => state.language.language);

  const zodiacSigns = [
    {
      signName: 'Aries',
      sign: language === 'ru' ? 'Овен' : 'Aries',
      dateRange:
        language === 'ru' ? '21 марта - 19 апреля' : 'March 21 - April 19',
      icon: <GiAries size={15} />,
    },
    {
      signName: 'Taurus',
      sign: language === 'ru' ? 'Телец' : 'Taurus',
      dateRange: language === 'ru' ? '20 апреля - 20 мая' : 'April 20 - May 20',
      icon: <GiTaurus size={15} />,
    },
    {
      signName: 'Gemini',
      sign: language === 'ru' ? 'Близнецы' : 'Gemini',
      dateRange: language === 'ru' ? '21 мая - 20 июня' : 'May 21 - June 20',
      icon: <GiGemini size={15} />,
    },
    {
      signName: 'Cancer',
      sign: language === 'ru' ? 'Рак' : 'Cancer',
      dateRange: language === 'ru' ? '21 июня - 22 июля' : 'June 21 - July 22',
      icon: <GiCancer size={15} />,
    },
    {
      signName: 'Leo',
      sign: language === 'ru' ? 'Лев' : 'Leo',
      dateRange:
        language === 'ru' ? '23 июля - 22 августа' : 'July 23 - August 22',
      icon: <GiLeo size={15} />,
    },
    {
      signName: 'Virgo',
      sign: language === 'ru' ? 'Дева' : 'Virgo',
      dateRange:
        language === 'ru'
          ? '23 августа - 22 сентября'
          : 'August 23 - September 22',
      icon: <GiVirgo size={15} />,
    },
    {
      signName: 'Libra',
      sign: language === 'ru' ? 'Весы' : 'Libra',
      dateRange:
        language === 'ru'
          ? '23 сентября - 22 октября'
          : 'September 23 - October 22',
      icon: <GiLibra size={15} />,
    },
    {
      signName: 'Scorpio',
      sign: language === 'ru' ? 'Скорпион' : 'Scorpio',
      dateRange:
        language === 'ru'
          ? '23 октября - 21 ноября'
          : 'October 23 - November 21',
      icon: <GiScorpio size={15} />,
    },
    {
      signName: 'Sagittarius',
      sign: language === 'ru' ? 'Стрелец' : 'Sagittarius',
      dateRange:
        language === 'ru'
          ? '22 ноября - 21 декабря'
          : 'November 22 - December 21',
      icon: <GiSagittarius size={15} />,
    },
    {
      signName: 'Capricorn',
      sign: language === 'ru' ? 'Козерог' : 'Capricorn',
      dateRange:
        language === 'ru'
          ? '22 декабря - 19 января'
          : 'December 22 - January 19',
      icon: <GiCapricorn size={15} />,
    },
    {
      signName: 'Aquarius',
      sign: language === 'ru' ? 'Водолей' : 'Aquarius',
      dateRange:
        language === 'ru'
          ? '20 января - 18 февраля'
          : 'January 20 - February 18',
      icon: <GiAquarius size={15} />,
    },
    {
      signName: 'Pisces',
      sign: language === 'ru' ? 'Рыбы' : 'Pisces',
      dateRange:
        language === 'ru' ? '19 февраля - 20 марта' : 'February 19 - March 20',
      icon: <GiPisces size={15} />,
    },
  ];

  const handleZodiacClick = async (zodiac) => {
    try {
      const response = await fetch('https://poker247tech.ru/get_horoscope/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sign: zodiac.signName.toLowerCase(),
          language: language === 'ru' ? 'original' : 'translated',
          period: 'today',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Данные получены:', data);
        setSelectedSign({ sign: zodiac.sign, horoscope: data.horoscope });
      }
    } catch (error) {
      console.error('Ошибка при получении данных с API:', error);
    }
  };

  return (
    <div className="wrap">
      {!selectedSign && <LanguageSwitcher />}
      {selectedSign ? (
        <ZodiacDetail
          signDetail={selectedSign}
          onClose={() => setSelectedSign(null)}
        />
      ) : (
        <div className="grid">
          {zodiacSigns.map((zodiac) => (
            <ZodiacBlock
              key={zodiac.sign}
              sign={zodiac.sign}
              dateRange={zodiac.dateRange}
              icon={zodiac.icon}
              onClick={() => handleZodiacClick(zodiac)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
