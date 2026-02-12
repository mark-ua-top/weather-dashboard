import React, { useEffect, useState } from 'react';
import '../../../dstyle.css';
import './pets.css';

export const Pets = () => {
    const [news, setNews] = useState([]);
    const [visibleRows, setVisibleRows] = useState(1);
    const apiKey = 'ea7ac545c116453e9cf2dc121aae296d';

    useEffect(() => {
        fetch(`https://newsapi.org/v2/everything?q=animals&language=en&pageSize=12&apiKey=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                const filtered = data.articles.filter(a => a.urlToImage);
                setNews(filtered);
            });
    }, []);

    const showMore = () => setVisibleRows(prev => prev + 1);

    const visibleNews = news.slice(0, visibleRows * 4);

    return (
        <section className="pets">
            <div className="container">
                <h2>Interacting with our pets</h2>
                <div className="pets-grid">
                    {visibleNews.map((n, i) => (
                        <div key={i} className="pet-card">
                            <img src={n.urlToImage} alt={n.title} />
                            <p>{n.title}</p>
                        </div>
                    ))}
                </div>
                {visibleNews.length < news.length && (
                    <button className="pets-btn" onClick={showMore}>See more</button>
                )}
            </div>
        </section>
    )
}