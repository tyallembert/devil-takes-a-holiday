import React, { useState } from 'react'
import "../../styles/ArtistForm.scss";
import { addArtist, updateArtist } from '../../utils/queries';

const ArtistForm = ({artist, setEditingArtist, setShowingNewForm, fetchArtists}) => {
    const [newArtist, setNewArtist] = useState({
        id: artist ? artist.id : '',
        firstName: artist ? artist.firstName : '',
        middleName: artist ? artist.middleName : '',
        lastName: artist ? artist.lastName : '',
        pronouns: artist ? artist.pronouns : '',
        title: artist ? artist.title : '',
        email: artist ? artist.email : '',
        instagramHandle: artist ? artist.instagramHandle : '',
        instagramURL: artist ? artist.instagramURL : '',
        websiteURL: artist ? artist.websiteURL : '',
        created_at: artist ? artist.created_at : ''
    });
    const handleChange = (event) => {
        setNewArtist({ ...newArtist, [event.target.name]: event.target.value });
    }
    const handleUpdate = (event) => {
        event.preventDefault();
        updateArtist(newArtist).then(() => {
            fetchArtists();
            setEditingArtist(null);
        });
        console.log('Update Artist:', newArtist);
    }
    const handleNew = (event) => {
        event.preventDefault();
        addArtist(newArtist).then(() => {
            fetchArtists();
            setEditingArtist(null);
            setShowingNewForm(false);
        });
    }
    const handleCancel = (e) => {
        e.preventDefault();
        setEditingArtist(null);
        setShowingNewForm(false);
    }
    return (
        <form className='artistForm'>
            <h2>New Artist</h2>
            <div className='inputContainer'>
                <label htmlFor='firstName'>First Name:</label>
                <input type='text' id='firstName' name='firstName' value={newArtist.firstName} onChange={handleChange}/>
            </div>
            <div className='inputContainer'>
                <label htmlFor='middleName'>Middle Name:</label>
                <input type='text' id='middleName' name='middleName' value={newArtist.middleName} onChange={handleChange}/>
            </div>
            <div className='inputContainer'>
                <label htmlFor='lastName'>Last Name:</label>
                <input type='text' id='lastName' name='lastName' value={newArtist.lastName} onChange={handleChange}/>
            </div>
            <div className='inputContainer'>
                <label htmlFor='pronouns'>Pronouns:</label>
                <input type='text' id='pronouns' name='pronouns' value={newArtist.pronouns} onChange={handleChange}/>
            </div>
            <div className='inputContainer'>
                <label htmlFor='title'>Title:</label>
                <input type='text' id='title' name='title' value={newArtist.title} onChange={handleChange}/>
            </div>
            <div className='inputContainer'>
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' name='email' value={newArtist.email} onChange={handleChange}/>
            </div>
            <div className='inputContainer'>
                <label htmlFor='instagramHandle'>Instagram Handle:</label>
                <input type='text' id='instagramHandle' name='instagramHandle' value={newArtist.instagramHandle} onChange={handleChange}/>
            </div>
            <div className='inputContainer'>
                <label htmlFor='instagramURL'>Instagram URL:</label>
                <input type='url' id='instagramURL' name='instagramURL' value={newArtist.instagramURL} onChange={handleChange}/>
            </div>
            <div className='inputContainer'>
                <label htmlFor='websiteURL'>Website URL:</label>
                <input type='url' id='websiteURL' name='websiteURL' value={newArtist.websiteURL} onChange={handleChange}/>
            </div>
            <div className='buttonsContainer'>
                <button className='submitButton' onClick={artist ? handleUpdate: handleNew}>Update</button>
                <button className='cancelButton' onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default ArtistForm