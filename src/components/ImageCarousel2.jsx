import React, { useState } from "react";
import "../styles/imageCarousel2.scss";

const ImageCarousel2 = () => {
    const driveLink = "https://drive.google.com/uc?export=view&id=";
    const imagesArray = [
        { id: 0, url: driveLink+"1a6t1k-Eng42F5fgedrsRjmVHcnLnE2WE" },
        { id: 1, url: driveLink+""},
        { id: 2, url: driveLink+"" },
        { id: 3, url: driveLink+""},
        { id: 4, url: driveLink+""},
    ];
    const [activeIndex, setActiveIndex] = useState(1);
    const [prevIndex, setPrevIndex] = useState(0);

    const handleImageChange = (event) => {
        const imageID = parseInt(event.currentTarget.id);
        const leftPos = event.currentTarget.offsetLeft;
        const heightAnimation = [
            { position: "absolute", bottom: "0", zIndex: "1", height: "150px", width: "100px", left: `${leftPos}px` },
            { position: "absolute", bottom: "0", zIndex: "1", height: "100%", width: "100%", left: `0px`}
        ];
        event.currentTarget.animate(heightAnimation, 
            {
                duration: 500,
                iterations: 1,
                easing: 'ease-out',
            }
        );
        setActiveIndex(imageID);
        setTimeout(() => {
            setPrevIndex(imageID);
        }
        , 480);
    }
    return (
        <div className="carouselContainer">
            <div className="activeImageContainer">
                <img src={imagesArray[prevIndex].url} className="image prevImage"/>
            </div>
            <div className="imagesContainer" >
                {
                    imagesArray.map((image, index) => {
                        return (
                            <>
                            <div
                                className={`image image${image.id} ${activeIndex === image.id ? 'activeImage' : 'inactiveImage'}`}
                                key={index}
                                id={image.id}
                                onClick={activeIndex !== image.id ? handleImageChange: null}
                            >
                                <img src={image.url} />
                            </div>
                            {
                                activeIndex === image.id && (
                                    <div className="placeHolder">
                                    </div>
                                )
                            }
                            </>
                        )
                        
                    })
                }
            </div>
        </div>
    );
}

export default ImageCarousel2;
