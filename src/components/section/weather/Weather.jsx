import React, { useEffect, useState } from 'react';
import '../../../dstyle.css'
import './weather.css'

export const Weather = () => {
    const [weather, setWeather] = useState(null);
    const apiKey = '62bf88a778653acc6a38cfb2f80523b2';
    const [city, setCity] = useState('Kyiv');

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(res => res.json())
            .then(data => setWeather(data))
            .catch(err => console.log(err));
    }, [city]);

    if (!weather) return <p>Loading...</p>;

    return (
        <section className="weather">
            <div className="container">
                <div className="weather-card">
                    <h2 className="weather-city">{weather.name}, {weather.sys.country}</h2>
                    <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
                    <p className="weather-description">{weather.weather[0].description}</p>
                </div>
            </div>
        </section>
    );
};
