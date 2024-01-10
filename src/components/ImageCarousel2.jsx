import React, { useState, useRef, useEffect } from "react";
import "../styles/imageCarousel2.scss";
import { IoIosArrowBack } from "react-icons/io"
import { DevilEyesOpen } from "./SVGs";
import Navigation from "./Navigation";

const ImageCarousel2 = () => {
    // const driveLink = "https://drive.google.com/uc?export=view&id=";
    const driveLink = "https://lh3.googleusercontent.com/d/";
    const imagesArray = [
        { id: 0, url: driveLink+"1a6t1k-Eng42F5fgedrsRjmVHcnLnE2WE" },
        { id: 1, url: driveLink+"1Y-YyEH5xAPJYOXIK2liiPzUWUG19eKkF"},
        { id: 2, url: driveLink+"1MYBc2Dbr6t4JPI7tv1oPOzluQWJjjEU5" },
        { id: 3, url: driveLink+"1JQMVj9dZvk7JnCjawAuu2x7u4jcjm0ST"},
        { id: 4, url: driveLink+"14vdF5PiQOar30iTN3rOY7ALAOgG7KYw3"},
        { id: 5, url: driveLink+"1JwLBa9y5rww9T1Oup8wQz0J_KUYjOLoU"},
        { id: 6, url: driveLink+"10j7gnrRiFViTBhHlHBE4qaGMufZ-2pBG"},
        { id: 7, url: driveLink+"1Of4EuH7x7PrOubv8oqxxcgypX8FVQHrN"},
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const counter = useRef(0);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }
        , 5000);
    }, []);

    const imageLoaded = () => {
        counter.current += 1;
        if (counter.current >= imagesArray.length) {
            setLoading(false);
        }
    }

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

            {
                loading && (
                    <div className="loadingContainer">
                        <DevilEyesOpen />
                        <div className="loader">
                            <div className="loadingDot"></div>
                            <div className="loadingDot"></div>
                            <div className="loadingDot"></div>
                        </div>
                    </div>
                )
            }
            <Navigation />
            <img src={imagesArray[activeIndex].url} alt="" className="image backgroundActiveImage"/>
            <div className="activeImageContainer">
                <div className="arrow prev" onClick={handlePrevImage}>
                    <IoIosArrowBack />
                </div>
                <img src={imagesArray[activeIndex].url} alt="" className="image activeImage"/>
                <div className="arrow next" onClick={handleNextImage}>
                    <IoIosArrowBack />
                </div>
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
                                <img src={image.url} alt="" onLoad={imageLoaded}/>
                            </div>
                            </>
                        )
                        
                    })
                }
            </div>
        </div>
    );
}

export default ImageCarousel2;
