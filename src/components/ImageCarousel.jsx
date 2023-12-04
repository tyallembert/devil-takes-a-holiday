import React, { useEffect, useState } from 'react';
import "../styles/imageCarousel.scss"

const ImageCarousel = ({ images }) => {
    const [inAnimation, setInAnimation] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setInAnimation(false);
        }
        , 1000);
    }, [])
    
    return (
        <div className="imageCarouselContainer">
            <div className={inAnimation?'image1 inAnimation': 'image1 bounceAnimation'}>
                <img src={images[0]} alt="Inside"/>
            </div>
            <div className={inAnimation?'image2 inAnimation': 'image2 bounceAnimation'}>
                <img src={images[1]} alt="Inside"/>
            </div>
            <div className={inAnimation?'image3 inAnimation': 'image3 bounceAnimation'}>
                <img src={images[2]} alt="Inside"/>
            </div>
        </div>
    )
}

export default ImageCarousel;