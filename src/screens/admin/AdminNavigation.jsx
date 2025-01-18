import React from 'react'
import "../../styles/AdminNavigation.scss";
import { DerpHorse } from "../../components/SVGs";

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
        <div className='backToHomeContainer'>
          <a className='backtoHomeButton' href='/'>Back to Website</a>
          <DerpHorse styles={{position: 'relative'}}/>
        </div>
    </div>
  )
}

export default AdminNavigation