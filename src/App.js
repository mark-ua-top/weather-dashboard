import React, { useState, useEffect } from 'react';
import './dstyle.css';
import './App.css';
import { Header } from './components/section/header/Header.jsx';
import { Hero } from './components/section/hero/Hero.jsx';
import { Weather } from './components/section/weather/Weather.jsx';
import { WeatherParam } from './components/section/weatherParam/WeatherParam.jsx';
import { Forecast } from './components/section/forecast/Forecast.jsx';
import { Pets } from './components/section/pets/Pets.jsx';
import { Nature } from './components/section/nature/Nature.jsx';
import { SignUp } from './components/section/auth/SignUp.jsx';
import { SignIn } from './components/section/auth/SignIn.jsx';
import { Footer } from './components/section/footer/Footer.jsx';

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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('signin');

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

  const requireAuth = (callback) => {
    const loggedIn = localStorage.getItem('authToken');
    if (loggedIn) {
      callback();
    } else {
      setAuthType('signin');
      setShowAuthModal(true);
    }
  };

  const handleAuthClose = () => setShowAuthModal(false);

  return (
    <>
      <Header
        onAuthClick={() => {
          console.log("CLICK WORKS");
          setAuthType('signup');
          setShowAuthModal(true);
        }}
      />
      <Hero addCity={addCity} />
      <Weather
        cities={cities}
        favorites={favorites}
        onDelete={deleteCity}
        onLike={(city) => requireAuth(() => toggleFavorite(city))}
        onMoreClick={(city) => requireAuth(() => setSelectedCity(city))}
        onForecastClick={(city) => requireAuth(() => setForecastCity(city))}
      />
      {selectedCity && <WeatherParam city={selectedCity} />}
      {forecastCity && <Forecast city={forecastCity} />}
      <Pets />
      <Nature />
      <Footer />
      {showAuthModal && (authType === 'signin'
        ? <SignIn onClose={handleAuthClose} switchAuth={() => setAuthType('signup')} />
        : <SignUp onClose={handleAuthClose} switchAuth={() => setAuthType('signin')} />
      )}
    </>
  );
}

export default App;