import React, { useEffect, useState, useContext } from 'react';
import './weather.css';
import LikeButton from '../../add/LikeButton';
import DeleteButton from '../../add/DeleteButton';
import RefreshButton from '../../add/RefreshButton';
import sun from '../../../img/sun.png';
import { NeedAuthModal } from '../modals/NeedAuthModal';
import { AuthContext } from '../auth/AuthContext';

export const Weather = ({ cities, favorites, onDelete, onLike, onMoreClick, onForecastClick }) => {
    const apiKey = '62bf88a778653acc6a38cfb2f80523b2';
    const [weatherData, setWeatherData] = useState([]);
    const [invalidCities, setInvalidCities] = useState([]);
    const [removing, setRemoving] = useState({});
    const [activeButton, setActiveButton] = useState({});
    const [showAuthModal, setShowAuthModal] = useState(false);

    const { user } = useContext(AuthContext);

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
                fetch(`https://api.openweathermap.org{encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
                    .then(res => res.json())
                    .then(data => data.cod === 200 ? { ...data, norm: normalize(city) } : (setInvalidCities(prev => [...prev, city]), null))
                    .catch(() => {
                        setInvalidCities(prev => [...prev, city]);
                        return null;
                    })
            )
        ).then(data => setWeatherData(data.filter(Boolean)));
    }, [cities, apiKey]);

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

    const requireAuth = (callback) => {
        if (user) callback();
        else setShowAuthModal(true);
    };

    return (
        <section className="weather">
            <div className="container">
                <ul className="weather-list">
                    {weatherData.map(weather => {
                        const cityNorm = weather.norm;
                        const now = new Date();
                        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const dateStr = now.toLocaleDateString('uk-UA').replace(/\//g, '.');
                        const dayStr = now.toLocaleDateString('en-US', { weekday: 'long' });

                        return (
                            <li key={weather.id} className={`weather-item ${removing[cityNorm] ? 'removing' : ''}`}>
                                {removing[cityNorm] && <div className="pieces-container">{Array.from({ length: 12 }).map((_, i) => <div key={i} className="piece" />)}</div>}

                                <div className="weather-header">
                                    <span className="city-name">{weather.name}</span>
                                    <span className="country-name">{weather.sys?.country}</span>
                                </div>

                                <div className="weather-time">{timeStr}</div>

                                <button
                                    className={`forecast-btn ${activeButton[cityNorm] === 'forecast' ? 'active' : ''}`}
                                    onClick={() => requireAuth(() => { onForecastClick(cityNorm); setActiveButton({ [cityNorm]: 'forecast' }); })}
                                >
                                    Hourly forecast
                                </button>

                                <div className="weather-date">
                                    <span>{dateStr}</span>
                                    <span className="separator">|</span>
                                    <span>{dayStr}</span>
                                </div>

                                <img className="weather-icon-main" src={sun} alt="weather icon" />

                                <div className="weather-temp-display">{Math.round(weather.main?.temp) || 0}°C</div>

                                <div className="weather-footer-actions">
                                    <RefreshButton onClick={() => { }} />
                                    <LikeButton
                                        isActive={favorites.includes(cityNorm)}
                                        onClick={() => requireAuth(() => onLike(cityNorm))}
                                    />
                                    <button className="see-more-action" onClick={() => requireAuth(() => onMoreClick(cityNorm))}>
                                        See more
                                    </button>
                                    <DeleteButton onClick={() => handleDelete(cityNorm)} />
                                </div>
                            </li>
                        );
                    })}

                    {invalidCities.map(city => {
                        const cityNorm = normalize(city);
                        const now = new Date();
                        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const dateStr = now.toLocaleDateString('uk-UA').replace(/\//g, '.');
                        const dayStr = now.toLocaleDateString('en-US', { weekday: 'long' });

                        return (
                            <li key={city} className={`weather-item-invalid ${removing[cityNorm] ? 'removing' : ''}`}>
                                <div className="weather-header">
                                    <span className="city-name">{city}</span>
                                    <span className="country-name">Error</span>
                                </div>
                                <div className="weather-time">{timeStr}</div>
                                <div className="weather-date">
                                    <span>{dateStr}</span>
                                    <span className="separator">|</span>
                                    <span>{dayStr}</span>
                                </div>
                                <div className="weather-icon-main">❓</div>
                                <div className="weather-temp-display">N/A</div>
                                <div className="weather-footer-actions">
                                    <DeleteButton onClick={() => handleDelete(cityNorm)} />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {showAuthModal && <NeedAuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />}
        </section>
    );
};
