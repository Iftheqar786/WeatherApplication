import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ data }) => {
  if (!data || !data.list || data.list.length === 0) {
    return <div className="weather-card">No data available</div>;
  }

  const getWeatherImage = (main) => {
    switch (main) {
      case 'Clear':
        return 'https://www.weatherbit.io/static/img/icons/c01d.png'; 
      case 'Clouds':
        return 'https://www.weatherbit.io/static/img/icons/c03d.png'; 
      case 'Rain':
        return 'https://www.weatherbit.io/static/img/icons/r01d.png'; 
      case 'Snow':
        return 'https://www.weatherbit.io/static/img/icons/s01d.png'; 
      default:
        return 'https://www.weatherbit.io/static/img/icons/unknown.png'; 
    }
  };

  const weatherDetails = data.list.map((item) => {
    const date = new Date(item.dt * 1000);
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });


    return (
      <div key={item.dt} className="day-details">
        <h2>{formattedDate}</h2>
        <p>{dayOfWeek}</p>
        <p>High: {item.main.temp_max} °F</p>
        <p>Low: {item.main.temp_min} °F</p>
        <p>Humidity: {item.main.humidity}%</p>
        <p>Sunrise: {new Date(item.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
        <p>Sunset: {new Date(item.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>

        <img src={getWeatherImage(item.weather[0].main)} alt={item.weather[0].description} />
      </div>
      
    );
  });

  return <div className="weather-card">{weatherDetails}</div>;
};

export default WeatherCard;

