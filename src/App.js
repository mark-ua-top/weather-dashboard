import React, { useState, useEffect, useContext } from 'react';
import './dstyle.css';
import './App.css';
import '../src/components/section/auth/auth.css';

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
import { AuthContext } from './components/section/auth/AuthContext.jsx';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const { user, logout } = useContext(AuthContext);
  const [cities, setCities] = useState(() => JSON.parse(localStorage.getItem('cities')) || []);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [selectedCity, setSelectedCity] = useState(null);
  const [forecastCity, setForecastCity] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('signin');

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [cities, favorites]);

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
    setFavorites(prev =>
      prev.includes(normalized)
        ? prev.filter(f => f !== normalized)
        : [normalized, ...prev]
    );
  };

  const requireAuth = (callback) => {
    if (user) {
      callback();
    } else {
      setAuthType('signin');
      setShowAuthModal(true);
    }
  };

  const handleAuthClose = () => setShowAuthModal(false);

  const openSignUp = () => {
    setAuthType('signup');
    setShowAuthModal(true);
  };

  return (
    <>
      <Header onAuthClick={openSignUp} user={user} logout={logout} />
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

      {showAuthModal && (
        <div className="auth-modal" onClick={handleAuthClose}>
          <div className="auth-modal__container" onClick={(e) => e.stopPropagation()}>
            {authType === 'signin' ? (
              <SignIn
                onClose={handleAuthClose}
                switchAuth={() => setAuthType('signup')}
              />
            ) : (
              <SignUp
                onClose={handleAuthClose}
                switchAuth={() => setAuthType('signin')}
              />
            )}
          </div>
        </div>
      )}

      <Analytics />
    </>
  );
}

export default App;