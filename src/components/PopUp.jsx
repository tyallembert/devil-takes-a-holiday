import React, {useState, useEffect} from 'react';
import '../styles/popUp.scss';
import { DevilDrawing, PalmTree } from "./SVGs";
import MerchImage from "../images/merch-shirt.jpg";

const PopUp = () => {
    const [showPopUp, setShowPopUp] = useState(true);
    const [showingContainer, setShowingContainer] = useState(true);
    useEffect(() => {
        if(!showPopUp) {
            setTimeout(() => {
                setShowingContainer(false);
            }, 750);
        }
    }, [showPopUp])
    
    return (
        <div className={showingContainer ? "popupContainer": "popupContainer hidden"} onClick={() => setShowPopUp(false)}>
            <div className={`popupContentContainer ${showPopUp ? 'inAnimation': 'outAnimation'}`}>
                <div className='imageContainer'>
                    <img className='popupImage' src={MerchImage} alt='merch shirt'/>
                </div>
                <div className='infoContainer'>
                    <h1 className='popupTitle'>New Merch!</h1>
                    <p className='popupInfo'>Drop in to pick up a shirt, beer glass and some stickers!</p>
                    <button className='closeButton' onClick={() => setShowPopUp(false)}>Continue to website</button>
                </div>
                
                <PalmTree/>
                <PalmTree/>
                <DevilDrawing/>
            </div>
        </div>
    );
};

export default PopUp;
