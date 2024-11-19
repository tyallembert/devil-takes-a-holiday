import React, { useEffect, useState } from 'react'
import { getArtistsHeader, updateArtistHeader } from '../../../utils/queries';
import '../../../styles/ArtistHeader.scss';
import { MdEdit } from 'react-icons/md';
import { FaCheck } from "react-icons/fa";
import PopupMessage from './PopupMessage';

const ArtistHeader = () => {
    const [showingForm, setShowingForm] = useState(false);
    const [successfulSave, setSuccessfulSave] = useState(false);
    const [headerInfo, setHeaderInfo] = useState({
        header: '',
        paragraph: '',
        paragraph2: ''
    });
    const [newHeaderInfo, setNewHeaderInfo] = useState({
        header: '',
        paragraph: '',
        paragraph2: ''
    });

    useEffect(() => {
        fetchHeaderInfo();
    }, []);
    const handleChange = (e) => {
        setNewHeaderInfo({ ...headerInfo, [e.target.name]: e.target.value });
    }
    const handleSave = async() => {
        await updateArtistHeader(newHeaderInfo).then((res) => {
            if(res.success) {
                setHeaderInfo(newHeaderInfo);
                setShowingForm(false);
                setSuccessfulSave(true);
                setTimeout(() => {
                    setSuccessfulSave(false);
                }, 3000)
            }
        })
    }
    const fetchHeaderInfo = async () => {
        const response = await getArtistsHeader();
        setHeaderInfo(response[0]);
        setNewHeaderInfo(response[0]);
    }
    return (
        <div className='headerContainer'>
            {
                successfulSave && <PopupMessage message='Header Updated' success={true} type='update'/>
            }
            {
                showingForm ? (
                    <>
                    <div className='header'>
                        <input
                        type="text"
                        name='header'
                        value={newHeaderInfo.header}
                        onChange={handleChange}
                        className='headerInput' />
                    </div>
                    <textarea 
                    name='paragraph'
                    className='paragraphInput'
                    onChange={handleChange}>{newHeaderInfo.paragraph}</textarea>
                    <textarea 
                    name='paragraph2'
                    className='paragraphInput'
                    onChange={handleChange}>{newHeaderInfo.paragraph2}</textarea>
                    <div className='buttonsContainer'>
                        <button onClick={handleSave}className='button'><FaCheck /></button>
                        <button onClick={()=>setShowingForm(!showingForm)}className='button'>X</button>
                    </div>
                    </>
                ): (
                    <>
                    <div className='header'>
                        <h1>{headerInfo.header}</h1>
                        <button onClick={()=>setShowingForm(!showingForm)}className='button'><MdEdit/></button>
                    </div>
                    <p className='paragraph'>{headerInfo.paragraph}</p>
                    <p className='paragraph'>{headerInfo.paragraph2}</p>
                    </>
                )
            }
        </div>
    )
}

export default ArtistHeader