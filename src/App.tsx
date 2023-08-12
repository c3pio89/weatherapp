import React, { useState } from 'react';
import './App.css';
import CitySelector from './CitySelector';
import WeatherDisplay from './WeatherDisplay';

function App() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <main>
        <CitySelector onSelect={handleCitySelect} />
        {selectedCity && <WeatherDisplay city={selectedCity} />}
      </main>
    </div>
  );
}

export default App;
