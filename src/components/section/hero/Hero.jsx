import React, { useState } from 'react';
import { cities as worldCities } from 'world-cities-json';
import './hero.css';

const popularCities = worldCities.map(c => c.city_ascii);

export const Hero = ({ addCity, cities = [] }) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');

    const normalize = (str) => str.trim().toLowerCase();

    const handleChange = (e) => {
        const val = e.target.value;
        setInput(val);
        setError('');

        if (!val.trim()) {
            setSuggestions([]);
            return;
        }

        const regex = new RegExp(val, 'i');
        setSuggestions(popularCities.filter(c => regex.test(c)).slice(0, 5));
    };

    const handleSubmit = (city = input) => {
        const trimmed = city.trim();

        if (!trimmed) {
            setError('Please enter a city name');
            return;
        }

        const normalizedInput = normalize(trimmed);

        // Перевірка на дублікати
        const exists = cities.some(c => normalize(c) === normalizedInput);

        if (exists) {
            setError('City already exists');
            return;
        }

        addCity(trimmed);
        setInput('');
        setSuggestions([]);
        setError('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'
    });

    return (
        <section className="hero">
            <div className="container hero-container">
                <h1 className='hero-title'>Weather dashboard</h1>
                <ul className='hero-list'>
                    <li><p className='hero-item'>Create your personal list of favorite cities and always be aware of the weather.</p></li>
                    <li><p className='hero-item'>{formattedDate}</p></li>
                </ul>

                <ul className='hero-input-list'>
                    <li>
                        {/* Wrapper має бути тут, щоб error-message позиціонувався відносно нього */}
                        <div className="input-wrapper">
                            <input
                                // Динамічно додаємо клас input-error, якщо є помилка
                                className={`hero-input ${error ? 'input-error' : ''}`}
                                type="text"
                                placeholder="Search location..."
                                value={input}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                            {/* Повідомлення про помилку */}
                            {error && <p className="error-message">{error}</p>}
                        </div>

                        {suggestions.length > 0 &&
                            <ul className="suggestions">
                                {suggestions.map(s => (
                                    <li key={s} onClick={() => handleSubmit(s)}>{s}</li>
                                ))}
                            </ul>
                        }
                    </li>
                    <li><button className="hero-input-button" onClick={() => handleSubmit()}></button></li>
                </ul>
            </div>
        </section>
    );
};