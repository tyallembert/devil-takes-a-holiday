import React from 'react'
import { AdminProvider } from '../AdminContext'
import AdminSiteContent from './AdminSiteContent'

function AdminHomeLayout() {
    return (
        <AdminProvider>
            <AdminSiteContent />
        </AdminProvider>
    )
}

export default AdminHomeLayout