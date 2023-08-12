import React, { useEffect, useState } from 'react';
import { getWeatherData, getFiveDayWeatherData } from './weatherApi';
import './WeatherDisplay.css'; //

interface WeatherDisplayProps {
  city: string;
}

const kelvinToCelsius = (kelvin: number): number => {
  return kelvin - 273.15;
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastType, setForecastType] = useState<'current' | 'fiveDays'>('current');

  useEffect(() => {
    if (forecastType === 'current') {
      getWeatherData(city).then(data => {
        setWeatherData(data);
      });
    } else {
      getFiveDayWeatherData(city).then(data => {
        setWeatherData(data);
      });
    }
  }, [city, forecastType]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Weather for {city}</h2>
      <button onClick={() => setForecastType('current')}>Today</button>
      <button onClick={() => setForecastType('fiveDays')}>Next 5 Days</button>

      {forecastType === 'current' && weatherData.weather && (
        <div className="current-weather">
          <p>Temperature: {weatherData.main.temp && kelvinToCelsius(weatherData.main.temp).toFixed(1)} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
        </div>
      )}

      {forecastType === 'fiveDays' && weatherData.list && (
        <div className="forecast-list">
          {weatherData.list.map((day: any) => (
            <div key={day.dt} className="forecast-item">
              <p>Date: {new Date(day.dt * 1000).toLocaleDateString()}</p>
              <p>Temperature: {day.main.temp && kelvinToCelsius(day.main.temp).toFixed(1)} °C</p>
              <p>Weather: {day.weather && day.weather[0].description}</p>
              {day.weather && <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="Weather Icon" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
