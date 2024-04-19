import { useEffect, useState } from 'react';
import '../../styles/Artists.scss';
import { getArtists, getArtistsHeader } from '../../utils/queries';
import { FaArrowUpRightFromSquare, FaInstagram, FaRegEnvelope } from "react-icons/fa6";
import Footer from '../../components/Footer';
import Navigation from '../../components/Navigation';

const Artists = () => {
    const [artists, setArtists] = useState([]);
    const [headerInfo, setHeaderInfo] = useState({
        header: '',
        paragraph: '',
        paragraph2: ''
    });

    useEffect(() => {
        fetchArtists();
    }, []);
    const fetchArtists = async () => {
        const response = await getArtists();
        setArtists(response);
        const headerRes = await getArtistsHeader();
        setHeaderInfo(headerRes[0]);
    }
    return (
        <>
        <Navigation/>
        <div className='artistsContainer'>
            <div className='headerContainer'>
                <h1>{headerInfo.header}</h1>
                <p className='text'>{headerInfo.paragraph}</p>
                <p className='text'>{headerInfo.paragraph2}</p>
            </div>
            <div className='allArtists'>
            {
                artists.map((artist) => (
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
                            <a className='contactContainer' href={`http://${artist.websiteURL}`} target='_blank' rel="noreferrer">
                                <FaArrowUpRightFromSquare className='contactIcon website'/>
                                <p className='contactText'>{artist.websiteURL}</p>
                            </a>
                            )
                        }
                    </div>
                ))
            }
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Artists;