import React from 'react'
import { FaArrowUpRightFromSquare, FaInstagram, FaRegEnvelope } from "react-icons/fa6";
import { MdEdit } from 'react-icons/md';
import { deleteArtist } from '../../utils/queries';

const ArtistView = ({ artist, setEditingArtist, fetchArtists }) => {
    const handleDelete = async (artistID) => {
        console.log('Delete Artist:', artistID);
        deleteArtist(artistID).then(() => {
            fetchArtists();
        });
    }
    return (
        <div key={artist.id} className='artistContainer'>
            <div className='singleArtistHeader'>
                <h2 className='artistName'>{artist.firstName} {artist.middleName} {artist.lastName}</h2>
                {
                    artist.pronouns && <p className='pronouns'>{artist.pronouns}</p>
                }
                {
                    artist.title && <p className='title'>{artist.title}</p>
                }
            </div>
            {
                artist.instagramHandle && (
                <a className='contactContainer' href={artist.instagramURL ? artist.instagramURL: ''}>
                    <FaInstagram className='contactIcon instagram'/>
                    <p className='contactText'>@{artist.instagramHandle}</p>
                </a>
                )
            }
            {
                artist.email && (
                <a className='contactContainer' href={`mailto:${artist.email}`}>
                    <FaRegEnvelope className='contactIcon envelope'/>
                    <p className='contactText'>{artist.email}</p>
                </a>
                )
            }
            {
                artist.websiteURL && (
                <a className='contactContainer' href={artist.websiteURL} target='_blank' rel="noreferrer">
                    <FaArrowUpRightFromSquare className='contactIcon website'/>
                    <p className='contactText'>{artist.websiteURL}</p>
                </a>
                )
            }
            <div className='buttonsContainer'>
                <button onClick={()=>setEditingArtist(artist)} className='button'><MdEdit/></button>
                <button className='button deleteButton' onClick={() => handleDelete(artist.id)}>X</button>
            </div>
        </div>
    )
}

export default ArtistView