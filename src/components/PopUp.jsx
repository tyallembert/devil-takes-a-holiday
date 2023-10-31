import React, {useState, useEffect} from 'react';
import '../styles/popUp.scss';


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
        <div className={showingContainer ? "popupContainer": "popupContainer hidden"}>
            <div className={showPopUp ? 'popupContentContainer inAnimation': 'popupContentContainer outAnimation'}>
                <h1 className='popupTitle'>Important!</h1>
                <p className='popupInfo'>We will be closed from Nov. 16th - Dec. 2nd for contruction</p>
                <button className='closeButton' onClick={() => setShowPopUp(false)}>Continue to website</button>
            </div>
        </div>
    );
};

export default PopUp;
