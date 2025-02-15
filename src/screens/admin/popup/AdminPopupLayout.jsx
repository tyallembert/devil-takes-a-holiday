import React from 'react'
import { AdminProvider } from '../AdminContext'
import AdminPopupControl from './AdminPopupControl'

function AdminPopupLayout() {
    return (
        <AdminProvider>
            <AdminPopupControl />
        </AdminProvider>
    )
}

export default AdminPopupLayout