import React, {useState, useEffect} from 'react';
import '../styles/popUp.scss';
import { DevilDrawing, PalmTree } from "./SVGs"

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
                <h1 className='popupTitle'>Let us love you!</h1>
                <p className='popupInfo'>Get your tickets to the Devil's Valentine's Dinner, four courses that are so decadent it would be a sin to miss!</p>
                <a className='ticketLink' href='https://www.eventbrite.com/e/valentines-devil-dinner-tickets-824370954717?utm_experiment=test_share_listing&aff=ebdsshios'>
                    Reserve
                </a>
                <button className='closeButton' onClick={() => setShowPopUp(false)}>Continue to website</button>
                <PalmTree/>
                <PalmTree/>
                <DevilDrawing/>
            </div>
        </div>
    );
};

export default PopUp;
