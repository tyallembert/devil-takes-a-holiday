import React from 'react'
import { AdminProvider } from '../AdminContext'
import AdminArtists from './AdminArtists'

function AdminArtistLayout() {
    return (
        <AdminProvider>
            <AdminArtists />
        </AdminProvider>
    )
}

export default AdminArtistLayout