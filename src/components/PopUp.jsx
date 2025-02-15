import React, {useState, useEffect} from 'react';
import '../styles/popUp.scss';
import { DevilDrawing, PalmTree } from "./SVGs";
import { getPopupInfo } from '../utils/queries';

const PopUp = () => {
    const [showPopUp, setShowPopUp] = useState(true);
    const [showingContainer, setShowingContainer] = useState(true);
    const [popupInfo, setPopupInfo] = useState({
        showing: false,
        imageURL: '',
        showingImage: true,
        title: '',
        showingTitle: true,
        description: '',
        showingDescription: true,
        buttonText: '',
        buttonLink: '',
        showingButton: true,
    });
    useEffect(() => {
        if(!showPopUp) {
            setTimeout(() => {
                setShowingContainer(false);
            }, 750);
        }
    }, [showPopUp])
    useEffect(() => {
        fetchPopupInfo();
    } , [])
    
    const fetchPopupInfo = async () => {
        const data = await getPopupInfo();
        if(!data) {
            console.log("Error fetching popup info");
        } else {
            setPopupInfo(data);
        
        }
    }
    if(popupInfo.showing) {
        return (
            <div className={showingContainer ? "popupContainer": "popupContainer hidden"} onClick={() => setShowPopUp(false)}>
                <div className={`popupContentContainer ${showPopUp ? 'inAnimation': 'outAnimation'}`}>
                    {
                        popupInfo.showingImage ? (
                            <div className='imageContainer'>
                                {
                                    !popupInfo.imageURL ? (
                                        <h2>Error Fetching Image</h2>
                                    ): (
                                        <img className='popupImage' src={popupInfo.imageURL} alt='popup'/>
                                    )
                                }
                            </div>
                        ): null
                    }
                    <div className='infoContainer'>
                        {
                            popupInfo.showingTitle && <h1 className='popupTitle'>{popupInfo.title}</h1>
                        }
                        {
                            popupInfo.showingDescription && <p className='popupInfo'>{popupInfo.description}</p>
                        }
                        {
                            popupInfo.showingButton && <a href={popupInfo.buttonLink} className='popupButton'>{popupInfo.buttonText}</a>
                        }
                        <button className='closeButton' onClick={() => setShowPopUp(false)}>Continue to website</button>
                    </div>
                    
                    <PalmTree/>
                    <PalmTree/>
                    <DevilDrawing/>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default PopUp;
