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
            <div className={showPopUp ? 'popupContentContainer inAnimation': 'popupContentContainer outAnimation'}>
                <h1 className='popupTitle'>Important!</h1>
                <p className='popupInfo'>We will be closed 12/24 & 12/25. Devil will be back on holiday 12/26!</p>
                <button className='closeButton' onClick={() => setShowPopUp(false)}>Continue to website</button>
                <PalmTree/>
                <PalmTree/>
                <DevilDrawing/>
            </div>
        </div>
    );
};

export default PopUp;
