import React, { useEffect, useState, useContext } from 'react';
import '../../../dstyle.css'
import './forecast.css'
import { Line } from 'react-chartjs-2';
import { AuthContext } from '../auth/AuthContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Forecast = ({ city }) => {

    const apiKey = '62bf88a778653acc6a38cfb2f80523b2';
    const [forecast, setForecast] = useState([]);
    const [mode, setMode] = useState('hourly');

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!city || !user) {
            setForecast([]);
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
            .then(res => res.json())
            .then(data => {
                if (data.list) setForecast(data.list);
                else setForecast([]);
            })
            .catch(() => setForecast([]));
    }, [city, user]);

    if (!user) return null;
    if (!forecast.length) return <p>Loading...</p>;

    const hourly = forecast.slice(0, 12);
    const weekly = forecast.reduce((acc, cur) => {
        const day = cur.dt_txt.split(' ')[0];
        const existing = acc.find(d => d.day === day);
        if (!existing) acc.push({ day, temp: cur.main.temp });
        return acc;
    }, []);

    const chartData = {
        labels: mode === 'hourly' ? hourly.map(f => f.dt_txt.slice(11, 16)) : weekly.map(f => f.day),
        datasets: [
            {
                label: 'Temperature °C',
                data: mode === 'hourly' ? hourly.map(f => f.main.temp) : weekly.map(f => f.temp),
                borderColor: '#FFB36C',
                tension: 0.4,
            }
        ]
    }

    return (
        <section className="forecast">
            <div className="forecast-container container">
                <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                    <button
                        className={`more-btn ${mode === 'hourly' ? 'active' : ''}`}
                        onClick={() => setMode('hourly')}
                    >
                        Hourly
                    </button>
                    <button
                        className={`more-btn ${mode === 'weekly' ? 'active' : ''}`}
                        onClick={() => setMode('weekly')}
                    >
                        Weekly
                    </button>
                </div>
                <Line data={chartData} />
            </div>
        </section>
    )
}