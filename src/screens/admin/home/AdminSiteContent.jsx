import React, { useEffect, useState } from 'react'
import "../../../styles/SiteContent.scss";
import { getSiteContent } from '../../../utils/queries';
import TimeChange from './TimeChange';
import AdminNavigation from '../AdminNavigation';
import { DerpHorse } from '../../../components/SVGs';

const AdminSiteContent = () => {
  const [siteContent, setSiteContent] = useState([]);

  useEffect(() => {
      getSiteContent().then((data) => {
          if(!data) {
              console.log(data.error)
          }else {
              setSiteContent(data)
          }
      });
    },[])

  return (
    <div className='adminHomeContainer'>
      <AdminNavigation />
      <div className='adminHero'>
        <h1>DTAH Admin</h1>
        <DerpHorse />
        <DerpHorse />
        <DerpHorse />
      </div>
      <div className='siteContentContainer'>
        {
          siteContent.map((content, index) => (
            <TimeChange content={content} key={index}/>
          ))
        }
      </div>
    </div>
  )
}

export default AdminSiteContent