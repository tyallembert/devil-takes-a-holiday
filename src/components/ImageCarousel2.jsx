import React, { useState } from "react";
import "../styles/imageCarousel2.scss";

const ImageCarousel2 = () => {
    const driveLink = "https://drive.google.com/uc?export=view&id=";
    const imagesArray = [
        { id: 0, url: driveLink+"1a6t1k-Eng42F5fgedrsRjmVHcnLnE2WE" },
        { id: 1, url: driveLink+"1SnQ8t2_pq4iSveky_2_Wye6S4h6cPx6m"},
        { id: 2, url: driveLink+"1Y-YyEH5xAPJYOXIK2liiPzUWUG19eKkF" },
        { id: 3, url: driveLink+"13MGr9JFTNBtDFIksFoFITkCPECJ4b8cV"},
        { id: 4, url: driveLink+"1MYBc2Dbr6t4JPI7tv1oPOzluQWJjjEU5"},
        { id: 5, url: driveLink+"1JwLBa9y5rww9T1Oup8wQz0J_KUYjOLoU"},
    ];
    const [activeIndex, setActiveIndex] = useState(1);
    // const [prevIndex, setPrevIndex] = useState(0);

    const handleImageClick = (event) => {
        const imageID = parseInt(event.currentTarget.id);
        setActiveIndex(imageID);
    }
    const handleNextImage = () => {
        if (activeIndex === imagesArray.length - 1) {
            setActiveIndex(0);
        } else {
            setActiveIndex(activeIndex + 1);
        }
    }
    const handlePrevImage = () => {
        if (activeIndex === 0) {
            setActiveIndex(imagesArray.length - 1);
        } else {
            setActiveIndex(activeIndex - 1);
        }
    }
    return (
        <div className="carouselContainer">
            <img src={imagesArray[activeIndex].url} className="image backgroundActiveImage"/>
            <div className="activeImageContainer">
                <div className="arrow prev" onClick={handlePrevImage}></div>
                <img src={imagesArray[activeIndex].url} className="image activeImage"/>
                <div className="arrow next" onClick={handleNextImage}></div>
            </div>
            <div className="imagesContainer" >
                {
                    imagesArray.map((image, index) => {
                        return (
                            <>
                            <div
                                className='image inactiveImage'
                                key={index}
                                id={image.id}
                                onClick={handleImageClick}
                            >
                                <img src={image.url} alt=""/>
                            </div>
                            {/* {
                                activeIndex === image.id && (
                                    <div className="placeHolder">
                                    </div>
                                )
                            } */}
                            </>
                        )
                        
                    })
                }
            </div>
        </div>
    );
}

export default ImageCarousel2;
