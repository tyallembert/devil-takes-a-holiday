import React, { useEffect, useState } from 'react';
import "../../../styles/AdminPopupControl.scss";
import AdminNavigation from '../AdminNavigation';
import Login from '../Login';
import OnOffSlider from './OnOffSlider';
import { getPopupInfo, savePopupImage, savePopupInfo } from '../../../utils/queries';
import { FaCheck } from "react-icons/fa";
import { CiMobile3 } from "react-icons/ci";
import { IoIosDesktop } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";
import { useAdmin } from '../AdminContext';

const AdminPopupControl = () => {
    const { session } = useAdmin();
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

    const [newImageFile, setNewImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [showingDesktop, setShowingDesktop] = useState(true);
    const [showingSaveButton, setShowingSaveButton] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        fetchPopupInfo();
    }, [])
    useEffect(() => {
        if (!newImageFile) {
            setImagePreview(null)
            return
        }

        const objectUrl = URL.createObjectURL(newImageFile)
        setImagePreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [newImageFile])

    const fetchPopupInfo = async () => {
        const data = await getPopupInfo();
        if(!data) {
            console.log("Error fetching data");
        } else {
            setPopupInfo(data);
            setOldInfo(data);
        }
    }
    const checkSaveButton = () => {
        if(popupInfo !== oldInfo || newImageFile) {
            setShowingSaveButton(true);
        } else {
            setShowingSaveButton(false);
        }
    }
    useEffect(() => {   
        checkSaveButton();
    })
    
    const changePreviewDevice = (e) => {
        if(e.target.name === 'deviceType') {
            setShowingDesktop(!showingDesktop);
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
    const handleNewImageChange = (e) => {
        setNewImageFile(e.target.files[0]);
        setShowingSaveButton(true);
    }
    const handleReset = () => {
        setPopupInfo(oldInfo);
        setNewImageFile(null);
        setImagePreview(null);
    }
    const handleSave = async () => {
        const savedData = await savePopupInfo(popupInfo);
        let savedImage = false;
        if(newImageFile) {
            savedImage = await savePopupImage(newImageFile);
            setPopupInfo({...popupInfo, imageURL: savedImage});
        }
        if(savedData) {
            setSaveSuccess(true);
            setTimeout(() => {
                setSaveSuccess(false);
                setOldInfo(popupInfo);
                setNewImageFile(null);
                setImagePreview(null);
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
                        <label htmlFor='image' className='textLabel'>
                            <p className='text'>Image</p>
                            <OnOffSlider name='showingImage' popupInfo={popupInfo.showingImage} handleChange={handleChange}/>
                            <input 
                                type='file' 
                                name='image' 
                                id='image' 
                                accept='image/*' 
                                onChange={handleNewImageChange}
                                hidden
                            />
                            <div className={`newImageButton ${newImageFile && "fileUploaded"}`}>
                                {
                                    newImageFile ? <p>{newImageFile.name}</p> : <LuImagePlus/>
                                }
                            </div>
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
                    <OnOffSlider name='deviceType' popupInfo={showingDesktop} handleChange={changePreviewDevice} scale={1.2} onIcon={<IoIosDesktop />} offIcon={<CiMobile3 />}/>
                    <div className={`previewContainer 
                    ${popupInfo.showing ? "": "hidden"} 
                    ${showingDesktop ? "": "mobileView"}`}>
                        {
                            popupInfo.showingImage ? <img src={newImageFile ? imagePreview :popupInfo.imageURL} alt='popup' className='image'/> : null
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