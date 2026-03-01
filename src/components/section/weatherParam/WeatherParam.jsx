import React, { useEffect, useState } from 'react';
import './weatherParam.css';

import feelsLikeIcon from '../../../img/feels-like.png';
import humidityIcon from '../../../img/humidity.png';
import pressureIcon from '../../../img/pressure.png';
import windIcon from '../../../img/wind.png';
import visibilityIcon from '../../../img/visibility.png';

export const WeatherParam = ({ city }) => {
    const apiKey = '62bf88a778653acc6a38cfb2f80523b2';
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!city) return;
        setData(null);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(res => res.json())
            .then(result => setData(result.cod === 200 ? result : null))
            .catch(() => setData(null));
    }, [city]);

    if (!data) return <p className="loading-text">Loading {city}...</p>;

    return (
        <section className="weather-param">
            <div className="weather-container container">
                <div className="param-grid">

                    <div className="param-card">
                        <span className="param-label">Feels like</span>
                        <span className="param-value">{Math.round(data.main.feels_like)}°C</span>
                        <img src={feelsLikeIcon} alt="Feels like" className="param-icon" />
                    </div>

                    <div className="param-card">
                        <span className="param-label">Min °C</span>
                        <span className="param-value">{Math.round(data.main.temp_min)}°C</span>
                        <span className="param-label">Max °C</span>
                        <span className="param-value">{Math.round(data.main.temp_max)}°C</span>
                    </div>

                    <div className="param-card">
                        <span className="param-label">Humidity</span>
                        <span className="param-value">{data.main.humidity}%</span>
                        <img src={humidityIcon} alt="Humidity" className="param-icon" />
                    </div>

                    <div className="param-card">
                        <span className="param-label">Pressure</span>
                        <span className="param-value">{data.main.pressure} hPa</span>
                        <img src={pressureIcon} alt="Pressure" className="param-icon" />
                    </div>

                    <div className="param-card">
                        <span className="param-label">Wind speed</span>
                        <span className="param-value">{data.wind.speed} m/s</span>
                        <img src={windIcon} alt="Wind speed" className="param-icon" />
                    </div>

                    <div className="param-card">
                        <span className="param-label">Visibility</span>
                        <span className="param-value">
                            {data.visibility >= 10000 ? "Unlimited" : (data.visibility / 1000) + " km"}
                        </span>
                        <img src={visibilityIcon} alt="Visibility" className="param-icon" />
                    </div>
                </div>
            </div>
        </section>
    );
};