import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const WeatherPage = ({ city, setCity, weatherData, error }) => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    setCity(search);
  };

  return (
    <div className="weather-page">
      <h2>Погода в городе: {city}</h2>

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

      {/* Отображение ошибки */}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {/* Виджет погоды */}
      {weatherData && (
        <div className="weather-widget">
          <div className="weather-icon">
            <img
              src={`https://openweathermap.org/img/wn/ ${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
          </div>
          <div className="weather-details">
            <h3>{Math.round(weatherData.main.temp)}°C</h3>
            <p>{weatherData.weather[0].description}</p>
            <p>Влажность: {weatherData.main.humidity}%</p>
            <p>Давление: {weatherData.main.pressure} hPa</p>
            <p>Ветер: {weatherData.wind.speed} м/с</p>
            <p>Видимость: {weatherData.visibility} м</p>
          </div>
        </div>
      )}

      {/* Карта осадков */}
      {weatherData && (
        <div className="rain-map">
          <h3>Карта осадков</h3>
          <MapContainer
            center={[weatherData.coord.lat, weatherData.coord.lon]}
            zoom={10}
            style={{ height: '500px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright ">OpenStreetMap</a> contributors'
            />
            <TileLayer
              url={`https://tile.openweathermap.org/map/precipitation_new/ {z}/{x}/{y}.png?appid=bdf594d756229792419ff336375e32bf`}
              attribution="OpenWeatherMap"
            />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default WeatherPage;