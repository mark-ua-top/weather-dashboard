import React, { useEffect, useState } from 'react';
import '../../../dstyle.css';
import './nature.css';

export const Nature = () => {
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState(0);
    const apiKey = '51401289-2bd7732f7134c90fec2a6586b';

    useEffect(() => {
        fetch(`https://pixabay.com/api/?key=${apiKey}&q=nature&image_type=photo&per_page=20`)
            .then(res => res.json())
            .then(data => setImages(data.hits))
    }, []);

    const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);
    const nextSlide = () => setCurrent((current + 1) % images.length);

    return (
        <section className="container nature">
            <h1 className='nature-title'>Beautiful nature</h1>
            <div className="nature-slider">
                <button className="nav-btn left" onClick={prevSlide}>&lt;</button>

                {images.map((img, i) => {
                    let className = 'slide other';

                    if (i === current) className = 'slide active';
                    else if (i === (current - 1 + images.length) % images.length) className = 'slide prev';
                    else if (i === (current + 1) % images.length) className = 'slide next';
                    else if (i === (current - 2 + images.length) % images.length) className = 'slide prev2';
                    else if (i === (current + 2) % images.length) className = 'slide next2';

                    return (
                        <img
                            key={i}
                            src={img.webformatURL}
                            alt="nature"
                            className={className}
                            onClick={() => setCurrent(i)}
                        />
                    );
                })}

                <button className="nav-btn right" onClick={nextSlide}>&gt;</button>
            </div>
        </section>
    )
}