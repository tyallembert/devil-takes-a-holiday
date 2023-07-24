import React, { useState } from 'react';
import "../styles/imageCarousel.scss"
import Arrow from "../images/arrow.png"

const ImageCarousel = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const nextImage = () => {
        if (currentImage === images.length - 1) {
            setCurrentImage(0);
        } else {
            setCurrentImage(currentImage + 1);
        }
    }
    const previousImage = () => {
        if (currentImage === 0) {
            setCurrentImage(images.length - 1);
        } else {
            setCurrentImage(currentImage - 1);
        }
    }
    return (
        <div className="imageCarouselContainer">
            <div className="imageCarousel">
                <div className="imageContainer">
                    <img className="image" src={images[currentImage]} alt="Inside"/>
                </div>
                <div className="buttonsContainer">
                    <button className="carouselButton previouse" onClick={previousImage}><img src={Arrow}/></button>
                    <button className="carouselButton next" onClick={nextImage}><img src={Arrow}/></button>
                </div>
            </div>
        </div>
    )
}

export default ImageCarousel;