import React from 'react'
import "../../styles/AdminNavigation.scss";
import AdminUser from './AdminUser';

const AdminNavigation = () => {
  return (
    <div className='adminNavigation'>
        <div className='leftSide'>
            <h2>Admin</h2>
            <a href='/admin'>Home</a>
            <a href='/admin/menu'>Menu</a>
            <a href='/admin/artists'>Artists</a>
            <a href='/admin/popup'>Popup</a>
        </div>
        <AdminUser />
    </div>
  )
}

export default AdminNavigation