import React, { useEffect, useState } from 'react';
import './weather.css';
import LikeButton from '../../add/LikeButton';
import DeleteButton from '../../add/DeleteButton';
import RefreshButton from '../../add/RefreshButton';
import sun from '../../../img/sun.png';

export const Weather = ({ cities, favorites, onDelete, onLike, onMoreClick, onForecastClick }) => {
    const apiKey = '62bf88a778653acc6a38cfb2f80523b2';
    const [weatherData, setWeatherData] = useState([]);
    const [invalidCities, setInvalidCities] = useState([]);
    const [removing, setRemoving] = useState({});
    const [activeButton, setActiveButton] = useState({});

    const normalize = (str) => str.trim().toLowerCase();

    useEffect(() => {
        if (!cities.length) {
            setWeatherData([]);
            setInvalidCities([]);
            return;
        }

        setInvalidCities([]);
        Promise.all(
            cities.map(city =>
                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
                    .then(res => res.json())
                    .then(data => data.cod === 200 ? { ...data, norm: normalize(city) } : (setInvalidCities(prev => [...prev, city]), null))
                    .catch(() => {
                        setInvalidCities(prev => [...prev, city]);
                        return null;
                    })
            )
        ).then(data => setWeatherData(data.filter(Boolean)));
    }, [cities]);

    const handleDelete = (city) => {
        setRemoving(prev => ({ ...prev, [city]: true }));
        setTimeout(() => {
            onDelete(city);
            setRemoving(prev => {
                const copy = { ...prev };
                delete copy[city];
                return copy;
            });
        }, 800);
    };

    return (
        <section className="weather">
            <div className="container">
                <ul className="weather-list">
                    {weatherData.map(weather => {
                        const cityNorm = weather.norm;
                        const now = new Date();
                        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const dateStr = now.toLocaleDateString();
                        const dayStr = now.toLocaleDateString([], { weekday: 'long' });

                        return (
                            <li key={weather.id} className={`weather-item ${removing[cityNorm] ? 'removing' : ''}`}>
                                {removing[cityNorm] && <div className="pieces-container">{Array.from({ length: 12 }).map((_, i) => <div key={i} className="piece" />)}</div>}

                                <div className="weather-header">
                                    <span>{weather.name}</span>
                                    <span>{weather.sys?.country}</span>
                                </div>

                                <div className="time-date">
                                    <div className="time">{timeStr}</div>
                                    <button className={`more-btn ${activeButton[cityNorm] === 'forecast' ? 'active' : ''}`}
                                        onClick={() => { onForecastClick(cityNorm); setActiveButton({ [cityNorm]: 'forecast' }); }}>
                                        Forecast
                                    </button>
                                    <div className="date">{dateStr} | {dayStr}</div>
                                </div>

                                <img className="weather-icon" src={sun} alt="sun" />

                                <div className="weather-temp">{Math.round(weather.main?.temp) || 0}°C</div>

                                <div className="weather-actions">
                                    <RefreshButton onClick={() => { }} />
                                    <LikeButton
                                        isActive={favorites.includes(cityNorm)}
                                        onClick={() => onLike(cityNorm)}
                                    />
                                    <button className="more-btn" onClick={() => onMoreClick(cityNorm)}>See more</button>
                                    <DeleteButton onClick={() => handleDelete(cityNorm)} />
                                </div>
                            </li>
                        );
                    })}

                    {invalidCities.map(city => {
                        const cityNorm = normalize(city);
                        const now = new Date();
                        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const dateStr = now.toLocaleDateString();
                        const dayStr = now.toLocaleDateString([], { weekday: 'long' });

                        return (
                            <li key={city} className={`weather-item-invalid ${removing[cityNorm] ? 'removing' : ''}`}>
                                {removing[cityNorm] && <div className="pieces-container">{Array.from({ length: 12 }).map((_, i) => <div key={i} className="piece" />)}</div>}

                                <div className="weather-header">
                                    <span>{city}</span>
                                    <span>City not found</span>
                                </div>

                                <div className="like-wrapper">
                                    <LikeButton
                                        isActive={favorites.includes(cityNorm)}
                                        onClick={() => onLike(cityNorm)}
                                    />
                                </div>

                                <div className="time-date">
                                    <div className="time">{timeStr}</div>
                                    <button className={`more-btn ${activeButton[cityNorm] === 'forecast' ? 'active' : ''}`}
                                        onClick={() => { onForecastClick(cityNorm); setActiveButton({ [cityNorm]: 'forecast' }); }}>
                                        Forecast
                                    </button>
                                    <div className="date">{dateStr} | {dayStr}</div>
                                </div>

                                <div className="weather-icon">❓</div>
                                <div className="weather-temp">0°C</div>

                                <div className="weather-actions">
                                    <DeleteButton onClick={() => handleDelete(cityNorm)} />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};