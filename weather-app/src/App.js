import React, { useState } from 'react';
import WeatherCard from './weatherCard';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = '46e368c4921fb5e8bf95a5f85efe19ab';

  const fetchWeatherData = async () => {
    try {
      const getGeoLoc=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
      const datass=await getGeoLoc.json()
      const {lat,lon}=datass[0]
      console.log(lat,lon)
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`
      );
      const data = await response.json();
      data.list.slice(0,5)
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };


  return (
    <div className="app">
      <header>
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Search</button>
      </header>
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;
