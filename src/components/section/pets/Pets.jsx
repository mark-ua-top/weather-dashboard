import React, { useEffect, useState } from 'react';
import '../../../dstyle.css';
import './pets.css';

export const Pets = () => {
    const [dogs, setDogs] = useState([]);
    const [visibleRows, setVisibleRows] = useState(1);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const response = await fetch('https://dog.ceo/api/breeds/image/random/50');
                const data = await response.json();
                if (data.status === 'success' && Array.isArray(data.message)) {
                    const formatted = data.message.map((imgUrl) => {
                        const parts = imgUrl.split('/');
                        const breedRaw = parts[parts.indexOf('breeds') + 1];
                        const breed = breedRaw.replace('-', ' ');
                        return { breed: breed.charAt(0).toUpperCase() + breed.slice(1), image: imgUrl };
                    });
                    setDogs(formatted);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchDogs();
    }, []);

    const showMore = () => setVisibleRows(prev => prev + 1);

    const cardsPerRow = 4;
    const visibleDogs = dogs.slice(0, visibleRows * cardsPerRow);
    const rows = [];
    for (let i = 0; i < visibleDogs.length; i += cardsPerRow) {
        rows.push(visibleDogs.slice(i, i + cardsPerRow));
    }

    const hasMore = visibleDogs.length < dogs.length;

    return (
        <section className="pets-section">
            <div className="container">
                <h2 className="pets-title">Interacting with our pets</h2>
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="pets-grid">
                        {row.map((dog, index) => (
                            <div key={index} className="pet-card">
                                <img className="pet-image" src={dog.image} alt={dog.breed} />
                                <p className="pet-news">{dog.breed}</p>
                            </div>
                        ))}
                    </div>
                ))}
                {hasMore && (
                    <button className="pets-btn" onClick={showMore}>
                        See more
                    </button>
                )}
            </div>
        </section>
    );
};