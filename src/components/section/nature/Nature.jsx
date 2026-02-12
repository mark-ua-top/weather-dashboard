import React, { useEffect, useState } from 'react';
import '../../../dstyle.css';
import './nature.css';

export const Nature = () => {
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(0);
    const apiKey = '51401289-2bd7732f7134c90fec2a6586b';

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=${apiKey}&q=nature&image_type=photo&per_page=5`)
            .then(res => res.json())
            .then(data => setImages(data.hits))
    }, []);

    const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);
    const nextSlide = () => setCurrent((current + 1) % images.length);

    return (
        <section className="nature">
            <div className="container nature-slider">
                <button className="nav-btn left" onClick={prevSlide}>&lt;</button>
                {images.map((img, i) => {
                    let className = 'slide';
                    if (i === current) className += ' active';
                    else if (i === (current - 1 + images.length) % images.length) className += ' prev';
                    else if (i === (current + 1) % images.length) className += ' next';
                    return <img key={i} src={img.webformatURL} alt="nature" className={className} />;
                })}
                <button className="nav-btn right" onClick={nextSlide}>&gt;</button>
            </div>
        </section>
    )
}