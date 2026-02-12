import React, { useState, useEffect } from 'react';
import './dstyle.css'
import './App.css'

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
  return (
    <>
      <Header />
      <Hero />
      <Weather />
      <WeatherParam />
      <Forecast />
      <Pets />
      <Nature />
      <Signup />
      <Footer />
    </>
  )
}

export default App;