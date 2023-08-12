import React, { useState } from 'react';

type CitySelectorProps = {
  onSelect: (city: string) => void;
};

function CitySelector(props: CitySelectorProps) {
  const [city, setCity] = useState('');

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleCitySubmit = () => {
    props.onSelect(city);
  };

  return (
    <div>
      <input type="text" value={city} onChange={handleCityChange} />
      <button onClick={handleCitySubmit}>Select City</button>
    </div>
  );
}

export default CitySelector;
