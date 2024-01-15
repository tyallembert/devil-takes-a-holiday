import React, { useState, useRef, useEffect } from "react";
import "../styles/imageCarousel2.scss";
import { IoIosArrowBack } from "react-icons/io"
import { DevilEyesOpen } from "./SVGs";
import Navigation from "./Navigation";

const ImageCarousel2 = () => {
    // const driveLink = "https://drive.google.com/uc?export=view&id=";
    const driveLink = "https://lh3.googleusercontent.com/d/";
    const imagesArray = [
        { id: 0, url: driveLink+"1a6t1k-Eng42F5fgedrsRjmVHcnLnE2WE", alt: "Sophisticated ambiance and stylish decor of our cocktail bar"},
        { id: 1, url: driveLink+"1Y-YyEH5xAPJYOXIK2liiPzUWUG19eKkF", alt: "Capturing the exclusive lounge experience at our upscale cocktail bar"},
        { id: 2, url: driveLink+"1MYBc2Dbr6t4JPI7tv1oPOzluQWJjjEU5", alt: "Talented mixologist creating signature cocktails live"},
        { id: 3, url: driveLink+"1JQMVj9dZvk7JnCjawAuu2x7u4jcjm0ST", alt: "Exquisite handcrafted cocktails at our bar"},
        { id: 4, url: driveLink+"14vdF5PiQOar30iTN3rOY7ALAOgG7KYw3", alt: "Unique and artistic presentation of our signature cocktails"},
        { id: 5, url: driveLink+"1JwLBa9y5rww9T1Oup8wQz0J_KUYjOLoU", alt: "Luxurious atmosphere and upscale vibes in our cocktail bar."},
        { id: 6, url: driveLink+"10j7gnrRiFViTBhHlHBE4qaGMufZ-2pBG", alt: "Charming outdoor view of our bar"},
        { id: 7, url: driveLink+"1Of4EuH7x7PrOubv8oqxxcgypX8FVQHrN", alt: "Savor gourmet delights at our bar"},
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const counter = useRef(0);

    useEffect(() => {
        // Set up event listeners for arrow keys
        const handleKeyDown = (event) => {
          if (event.key === "ArrowRight") {
            handleNextImage();
          } else if (event.key === "ArrowLeft") {
            handlePrevImage();
          }
        };
    
        document.addEventListener("keydown", handleKeyDown);
    
        // Clean up the event listener when the component unmounts
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      });
      
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
            <img src={imagesArray[activeIndex].url} alt={imagesArray[activeIndex].alt} className="image backgroundActiveImage"/>
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
                                className={`image inactiveImage ${activeIndex === index ? "activeSmallImage" : ""}`}
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
