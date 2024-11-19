import { useEffect, useState } from 'react';
import '../../../styles/Artists.scss';
import '../../../styles/AdminArtists.scss';
import { getArtists } from '../../../utils/queries';
import ArtistForm from './ArtistForm';
import ArtistView from './ArtistView';
import { supabase } from '../../../utils/supabase';
import Login from '../Login';
import AdminNavigation from '../AdminNavigation';
import ArtistHeader from './ArtistHeader';

const AdminArtists = () => {
    const [artists, setArtists] = useState([]);
    const [editingArtist, setEditingArtist] = useState(null);
    const [showingNewForm, setShowingNewForm] = useState(false);
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    useEffect(() => {
        fetchArtists();
    }, []);
    const fetchArtists = async () => {
        const response = await getArtists();
        setArtists(response);
    }

    if(!session) {
        return <Login/>
    }
    return (
        <>
        <AdminNavigation/>
        <div className='artistsContainer'>
            <ArtistHeader/>
            <button onClick={() => setShowingNewForm(true)} className='newButton'>+</button>
            {
                showingNewForm && (
                    <div className='newFormContainer'>
                        <ArtistForm setEditingArtist={setEditingArtist} setShowingNewForm={setShowingNewForm} fetchArtists={fetchArtists}/>
                    </div>
                )
            }
            <div className='allArtists'>
            {
                artists.map((artist) => {
                    if(editingArtist && editingArtist.id === artist.id) {
                        return (
                            <div key={artist.id} className='artistContainer'>
                                <ArtistForm key={artist.id} 
                                artist={artist} 
                                setEditingArtist={setEditingArtist}
                                setShowingNewForm={setShowingNewForm}
                                fetchArtists={fetchArtists}/>
                            </div>
                        )
                    }else{
                        return (
                        <ArtistView key={artist.id} 
                        artist={artist} 
                        setEditingArtist={setEditingArtist}
                        fetchArtists={fetchArtists}/>
                    )}
                })
            }
            </div>
        </div>
        </>
    )
}

export default AdminArtists;