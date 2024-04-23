import React, { useEffect, useState } from 'react';
import "../../styles/AdminPopupControl.scss";
import { supabase } from '../../utils/supabase';
import AdminNavigation from './AdminNavigation';
import Login from './Login';
import ShirtImage from "../../images/merch-shirt.jpg";
import OnOffSlider from './OnOffSlider';
import { savePopupInfo } from '../../utils/queries';
import { FaCheck } from "react-icons/fa";

const AdminPopupControl = () => {
    const [session, setSession] = useState(null);
    const [popupInfo, setPopupInfo] = useState({
        showing: true,
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
    const [oldInfo, setOldInfo] = useState({
        showing: true,
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
    const [showingSaveButton, setShowingSaveButton] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    useEffect(() => {
        fetchPopupInfo();
    }, [])
    useEffect(() => {   
        checkSaveButton();
    }, [popupInfo])

    const fetchPopupInfo = async () => {
        const { data, error } = await supabase.from('popupInfo').select('*').single();
        if(error) {
            console.log(error);
        } else {
            setPopupInfo(data);
            setOldInfo(data);
        }
    }
    const checkSaveButton = () => {
        if(popupInfo !== oldInfo) {
            setShowingSaveButton(true);
        } else {
            setShowingSaveButton(false);
        }
    }

    const handleChange = (e) => {
        if(e.target.name === 'showing') {
            setPopupInfo({...popupInfo, [e.target.name]: !popupInfo.showing})
        }
        else if(e.target.name === 'showingImage') {
            setPopupInfo({...popupInfo, [e.target.name]: !popupInfo.showingImage})
        }else if(e.target.name === 'showingTitle') {
            setPopupInfo({...popupInfo, [e.target.name]: !popupInfo.showingTitle})
        }else if(e.target.name === 'showingDescription') {
            setPopupInfo({...popupInfo, [e.target.name]: !popupInfo.showingDescription})
        }else if(e.target.name === 'showingButton') {
            setPopupInfo({...popupInfo, [e.target.name]: !popupInfo.showingButton})
        }else {
            setPopupInfo({...popupInfo, [e.target.name]: e.target.value})
        }
    }
    const handleReset = () => {
        setPopupInfo(oldInfo);
    }
    const handleSave = async () => {
        const saved = await savePopupInfo(popupInfo);
        if(saved) {
            setSaveSuccess(true);
            setTimeout(() => {
                setSaveSuccess(false);
                setOldInfo(popupInfo);
                setShowingSaveButton(false);
            }, 1200)
        }
    }

    if(!session) {
        return <Login/>
    } else {
        return (
            <div className='popupControlContainer'>
                <AdminNavigation/>
                <div className='contentBox controls'>
                    <h2>Controls</h2>
                    <OnOffSlider name='showing' popupInfo={popupInfo.showing} handleChange={handleChange} scale={1.3}/>
                    <div className='infoContainer'>
                        {
                            !popupInfo.showing && (
                                <div className='popupHiddenText'>
                                    <h2 className='text'>Popup Hidden</h2>
                                    <p className='text'>The popup will not show up on the home page</p>
                                </div>
                            )
                        }
                        <label htmlFor='imageURL' className='textLabel'>
                            <p className='text'>Image</p>
                            <OnOffSlider name='showingImage' popupInfo={popupInfo.showingImage} handleChange={handleChange}/>
                            <input
                                type='text'
                                name='imageURL'
                                id='imageURL'
                                value={popupInfo.image}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor='title' className='textLabel'>
                            <p className='text'>Title</p>
                            <OnOffSlider name='showingTitle' popupInfo={popupInfo.showingTitle} handleChange={handleChange}/>
                            <input
                                type='text'
                                name='title'
                                id='title'
                                value={popupInfo.title}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor='description' className='textLabel'>
                            <p className="text">Description</p>
                            <OnOffSlider name='showingDescription' popupInfo={popupInfo.showingDescription} handleChange={handleChange}/>
                            <textarea
                                name='description'
                                id='description'
                                onChange={handleChange}
                                value={popupInfo.description}
                            />
                        </label>
                        <label htmlFor='buttonText' className='textLabel'>
                            <p className="text">Button Text</p>
                            <OnOffSlider name='showingButton' popupInfo={popupInfo.showingButton} handleChange={handleChange}/>
                            <input
                                type='text'
                                name='buttonText'
                                id='buttonText'
                                value={popupInfo.buttonText}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor='buttonLink' className='textLabel'>
                            <p className="text">Button Link</p>
                            <input
                                type='text'
                                name='buttonLink'
                                id='buttonLink'
                                value={popupInfo.buttonLink}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    {
                        showingSaveButton ? (
                            <>
                            <button className={`saveButton ${saveSuccess && "success"}`} onClick={handleSave}>{saveSuccess ? <FaCheck />: "Save"}</button>
                            <button className='resetButton' onClick={handleReset}>Reset</button>
                            </>
                    ) : null
                    }
                </div>
                <div className='contentBox preview'>
                    <h2>Preview</h2>
                    <div className={`previewContainer ${popupInfo.showing ? "": "hidden"}`}>
                        {
                            popupInfo.showingImage ? <img src={ShirtImage} alt='shirt' className='image'/> : null
                        }
                        <div className='textContainer'>
                        {
                            popupInfo.showingTitle ? <h2 className='title'>{popupInfo.title}</h2> : null
                        }
                        {
                            popupInfo.showingDescription ? <p className='description'>{popupInfo.description}</p> : null
                        }
                        {
                            popupInfo.showingButton ? <button className='exampleButton'>{popupInfo.buttonText}</button> : null
                        }
                        </div>
                        <p className='continueButton'>Continue to Website</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPopupControl