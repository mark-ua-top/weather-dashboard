import React, { useState, useEffect } from 'react';
import './dstyle.css';
import './App.css';

import { Header } from './components/section/header/Header';
import { Hero } from './components/section/hero/Hero';
import { Weather } from './components/section/weather/Weather';
import { WeatherParam } from './components/section/weatherParam/WeatherParam';
import { Forecast } from './components/section/forecast/Forecast';
import { Pets } from './components/section/pets/Pets';
import { Nature } from './components/section/nature/Nature';
import { Signup } from './components/section/signup/Signup';
import { Footer } from './components/section/footer/Footer';

function App() {
  const [cities, setCities] = useState(() => {
    const saved = localStorage.getItem('cities');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCity, setSelectedCity] = useState(null);
  const [forecastCity, setForecastCity] = useState(null);

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addCity = (city) => {
    const normalized = city.trim().toLowerCase();
    if (!cities.includes(normalized)) setCities([...cities, normalized]);
  };

  const deleteCity = (city) => {
    const normalized = city.toLowerCase();
    setCities(cities.filter(c => c !== normalized));
    setFavorites(favorites.filter(f => f !== normalized));
    if (selectedCity === normalized) setSelectedCity(null);
    if (forecastCity === normalized) setForecastCity(null);
  };

  const toggleFavorite = (city) => {
    const normalized = city.toLowerCase();
    if (favorites.includes(normalized)) {
      setFavorites(favorites.filter(f => f !== normalized));
    } else {
      setFavorites([normalized, ...favorites]);
    }
  };

  return (
    <>
      <Header />
      <Hero addCity={addCity} />

      <Weather
        cities={cities}
        favorites={favorites}
        onDelete={deleteCity}
        onLike={toggleFavorite}
        onMoreClick={setSelectedCity}
        onForecastClick={setForecastCity}
      />

      {selectedCity && <WeatherParam city={selectedCity} />}
      {forecastCity && <Forecast city={forecastCity} />}

      <Pets />
      <Nature />
      <Signup />
      <Footer />
    </>
  );
}

export default App;