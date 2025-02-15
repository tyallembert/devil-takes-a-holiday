import React from 'react'
import { AdminProvider } from '../AdminContext'
import AdminPage from './AdminPage'

function AdminMenuLayout() {
    return (
        <AdminProvider>
            <AdminPage />
        </AdminProvider>
    )
}

export default AdminMenuLayout