import axios from 'axios';

const API_KEY = '0225ba3b3f7781d8e7f44cc93bb64492';

export const getWeatherData = async (city: string) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  );
  return response.data;
};

export const getFiveDayWeatherData = async (city: string) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
  );
  return response.data;
};
