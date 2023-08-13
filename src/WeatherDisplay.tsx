import React, { useEffect, useState } from 'react';
import { getWeatherData, getFiveDayWeatherData } from './weatherApi';
import './WeatherDisplay.css';

interface WeatherDisplayProps {
  city: string;
}

const kelvinToCelsius = (kelvin: number): number => {
  return kelvin - 273.15;
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastType, setForecastType] = useState<'current' | 'fiveDays'>('current');
  const [inputCity, setInputCity] = useState<string>(''); // Состояние для ввода города на русском
  const [isInputVisible, setIsInputVisible] = useState(true); // Состояние для видимости поля ввода

  const updateUniqueDates = (list: any[]) => {
    const uniqueDates: string[] = [];
    list.forEach((day: any) => {
      const dateString = new Date(day.dt * 1000).toLocaleDateString();
      if (!uniqueDates.includes(dateString)) {
        uniqueDates.push(dateString);
      }
    });
    return uniqueDates;
  };

  useEffect(() => {
    if (forecastType === 'current') {
      getWeatherData(city).then(data => {
        setWeatherData(data);
        if (data.list) {
          updateUniqueDates(data.list);
        }
      });
    } else {
      getFiveDayWeatherData(city).then(data => {
        setWeatherData(data);
        if (data.list) {
          updateUniqueDates(data.list);
        }
      });
    }

    // Скрыть поле ввода и кнопку
    setIsInputVisible(false);
  }, [city, forecastType]);

  const fetchWeather = () => {
    if (inputCity) {
      getWeatherData(inputCity).then(data => {
        setWeatherData(data);
        if (data.list) {
          updateUniqueDates(data.list);
        }
      });
    }
  };

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const uniqueDates = updateUniqueDates(weatherData.list || []);

  return (
    <div>
      <h2>Weather for {city}</h2>
      <button onClick={() => setForecastType('current')}>Today</button>
      <button onClick={() => setForecastType('fiveDays')}>Next 5 Days</button>

      {/* Отображение поля ввода и кнопки только при условии */}
      {isInputVisible && (
        <div>
          <input
            type="text"
            placeholder="Введите город на русском"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Получить погоду</button>
        </div>
      )}

      {forecastType === 'current' && weatherData.weather && (
        <div className="current-weather">
          <p>Temperature: {weatherData.main.temp && kelvinToCelsius(weatherData.main.temp).toFixed(1)} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
        </div>
      )}

      {forecastType === 'fiveDays' && weatherData.list && (
        <div className="forecast-list">
          {uniqueDates.map((date: string) => (
            <div key={date} className="forecast-item">
              <p>Date: {date}</p>
              {weatherData.list
                .filter((day: any) => new Date(day.dt * 1000).toLocaleDateString() === date)
                .map((day: any) => (
                  <div key={day.dt} className="time-column">
                    <p>Time: {new Date(day.dt * 1000).toLocaleTimeString()}</p>
                    <p>Temperature: {day.main.temp && kelvinToCelsius(day.main.temp).toFixed(1)} °C</p>
                    <p>Weather: {day.weather && day.weather[0].description}</p>
                    {day.weather && <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="Weather Icon" />}
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
