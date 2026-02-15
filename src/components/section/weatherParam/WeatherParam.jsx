import React, { useEffect, useState } from 'react';
import '../../../dstyle.css'
import './weatherParam.css'

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

    if (!data) return <p style={{ textAlign: 'center' }}>Loading {city}...</p>;

    return (
        <section className="weather-param">
            <div className="container param-grid">
                <div className="param-card">City<br />{data.name}, {data.sys.country}</div>
                <div className="param-card">Feels like<br />{Math.round(data.main.feels_like)}°C</div>
                <div className="param-card">Min °C<br />{Math.round(data.main.temp_min)}°C<br />Max °C<br />{Math.round(data.main.temp_max)}°C</div>
                <div className="param-card">Humidity<br />{data.main.humidity}%</div>
                <div className="param-card">Pressure<br />{data.main.pressure} hPa</div>
                <div className="param-card">Wind speed<br />{data.wind.speed} m/s</div>
                <div className="param-card">Visibility<br />{data.visibility / 1000} km</div>
            </div>
        </section>
    );
};