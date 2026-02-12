import React, { useEffect, useState } from 'react';
import '../../../dstyle.css'
import './weatherParam.css'

export const WeatherParam = () => {
    const apiKey = '62bf88a778653acc6a38cfb2f80523b2';
    const [data, setData] = useState(null);
    const city = 'Kyiv';

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(res => res.json())
            .then(setData)
    }, []);

    if (!data) return <p>Loading...</p>;

    return (
        <section className="weather-param">
            <div className="container param-grid">
                <div className="param-card">Feels like<br />{data.main.feels_like}°C</div>
                <div className="param-card">Min °C<br />{data.main.temp_min}°C<br />Max °C<br />{data.main.temp_max}°C</div>
                <div className="param-card">Humidity<br />{data.main.humidity}%</div>
                <div className="param-card">Pressure<br />{data.main.pressure} Pa</div>
                <div className="param-card">Wind speed<br />{data.wind.speed} m/s</div>
                <div className="param-card">Visibility<br />{data.visibility / 1000} km</div>
            </div>
        </section>
    )
}
