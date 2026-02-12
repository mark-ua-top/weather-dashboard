import React, { useEffect, useState } from 'react';
import '../../../dstyle.css'
import './forecast.css'
import { Line } from 'react-chartjs-2';
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

export const Forecast = () => {
    const [forecast, setForecast] = useState(null);
    const apiKey = '62bf88a778653acc6a38cfb2f80523b2';
    const city = 'Kyiv';

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
            .then(res => res.json())
            .then(data => setForecast(data.list.slice(0, 12)))
    }, []);

    if (!forecast) return <p>Loading...</p>;

    const chartData = {
        labels: forecast.map(f => f.dt_txt.slice(11, 16)),
        datasets: [
            {
                label: 'Temperature °C',
                data: forecast.map(f => f.main.temp),
                borderColor: '#FFB36C',
                tension: 0.4,
            }
        ]
    }

    return (
        <section className="forecast">
            <div className="container">
                <Line data={chartData} />
            </div>
        </section>
    )
}
