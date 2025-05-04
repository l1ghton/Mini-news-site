import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'; // Импорты из react-leaflet

const WeatherPage = ({ city, setCity, weatherData }) => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    setCity(search);
  };

  if (!weatherData) return <div>Загрузка...</div>;

  const { main, weather, wind, visibility, name, coord } = weatherData;

  return (
    <div className="weather-page">
      <h2>Погода в городе: {name}</h2>

      {/* Поиск города */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Введите город"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Найти</button>
      </div>

      {/* Большой виджет погоды */}
      <div className="weather-widget">
        <div className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
            alt={weather[0].description}
          />
        </div>
        <div className="weather-details">
          <h3>{Math.round(main.temp)}°C</h3>
          <p>{weather[0].description}</p>
          <p>Влажность: {main.humidity}%</p>
          <p>Давление: {main.pressure} hPa</p>
          <p>Ветер: {wind.speed} м/с</p>
          <p>Видимость: {visibility} м</p>
        </div>
      </div>

      {/* Карта осадков */}
      <div className="rain-map">
        <h3>Карта осадков</h3>
        <MapContainer
          center={[coord.lat, coord.lon]}
          zoom={10}
          style={{ height: '500px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=bdf594d756229792419ff336375e32bf`}
            attribution="OpenWeatherMap"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default WeatherPage;