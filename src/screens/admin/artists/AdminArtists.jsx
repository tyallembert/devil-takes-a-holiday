import { useEffect, useState } from 'react';
import '../../../styles/Artists.scss';
import '../../../styles/AdminArtists.scss';
import { getArtists } from '../../../utils/queries';
import ArtistForm from './ArtistForm';
import ArtistView from './ArtistView';
import Login from '../Login';
import AdminNavigation from '../AdminNavigation';
import ArtistHeader from './ArtistHeader';
import QuickAdd from '../menu/QuickAdd';
import { useAdmin } from '../AdminContext';

const AdminArtists = () => {
    const [artists, setArtists] = useState([]);
    const [editingArtist, setEditingArtist] = useState(null);
    const [showingNewForm, setShowingNewForm] = useState(false);
    const { session } = useAdmin();

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
            <QuickAdd type="artist" setter={setArtists}/>

            <button onClick={() => setShowingNewForm(true)} className='button quickAddButton'>New Artist</button>
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