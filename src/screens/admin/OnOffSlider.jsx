import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import '../../styles/OnOffSlider.scss';

const OnOffSlider = ({ name, popupInfo, handleChange, scale=0.9, onIcon=<FaRegEye/>, offIcon=<FaRegEyeSlash/>}) => {
  return (
    <label htmlFor={name} className='onOffLabel'>
        <input
            type='checkbox'
            name={name}
            id={name}
            value={popupInfo}
            defaultChecked={popupInfo}
            onChange={handleChange}
        />
        <div className={`sliderContainer ${popupInfo ? "showing": ""} ${name === "showing" ? "showingButton": ""}`} style={{transform: `scale(${scale})`}}>
            <div className={`activeBackground ${popupInfo ? "": "right"}`}></div>
            <div className='regEye'>
                {onIcon}
            </div>
            <div className='slashEye'>
                {offIcon}
            </div>
        </div>
    </label>
  )
}

export default OnOffSlider