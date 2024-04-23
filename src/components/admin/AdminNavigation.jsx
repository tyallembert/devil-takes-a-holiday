import React from 'react'
import "../../styles/AdminNavigation.scss";

const AdminNavigation = () => {
  return (
    <div className='adminNavigation'>
        <div className='leftSide'>
            <h2>Admin</h2>
            <a href='/admin'>Menu</a>
            <a href='/admin/artists'>Artists</a>
            <a href='/admin/popup'>Popup</a>
        </div>
        <div className='rightSide'>
            <a href="https://youtu.be/eetOtJTIDTM" target="_blank" rel="noreferrer" className="tutorialLink">Menu Tutorial</a>
        </div>
    </div>
  )
}

export default AdminNavigation