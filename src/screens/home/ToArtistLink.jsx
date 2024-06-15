import React from 'react'
import "../../styles/ToArtistLink.scss"
import { DevilDrawing } from "../../components/SVGs"
import { GiPaintBrush } from "react-icons/gi";

const ToArtistLink = () => {
  return (
    <div className='artistLinkContainer'>
        <h1 className='header'>Featured Artists!</h1>
        <p>Want to get in contact with some of the current artists?</p>
        <a href="/artists" className="artistLink">Learn More!</a>
        <div className='backgroundImageContainer'>
          <DevilDrawing />
          <GiPaintBrush className='paintBrushIcon'/>
        </div>
    </div>
  )
}

export default ToArtistLink