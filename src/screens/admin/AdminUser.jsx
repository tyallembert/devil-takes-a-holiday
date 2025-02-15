import React, { useState } from 'react'
import { useAdmin } from './AdminContext';
import "../../styles/AdminUser.scss";
import { GiBullHorns } from "react-icons/gi";

function AdminUser() {
    const [showing, setShowing] = useState(false)
    const { session, logout } = useAdmin();
    return (
        <div className={`userContainer ${showing?"large":""}`}
        onMouseEnter={() => setShowing(true)}
        onMouseLeave={() => setShowing(false)}>
            <GiBullHorns size={30} className="hornsIcons"/>
            {
                showing ? (
                    <div className='infoContainer'>
                        <p className='userEmail'>{session?.user.email}</p>
                        <button onClick={logout} className='button logout'>Logout</button>
                    </div>
                ): null
            }
        </div>
    )
}

export default AdminUser