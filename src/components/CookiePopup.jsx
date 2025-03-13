import React, { useState } from 'react';
import '../styles/CookiePopup.scss';

const CookiePopup = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleAccept = () => {
    setShowPopup(false);
    // You can add logic to store the cookie preference here
  };

  return (
    <>
      {showPopup && (
        <div className="cookie-popup">
          <div className="cookie-content">
            <p>
              Even the Devil can't resist our cookies! 🍪<br />
              Indulge and accept to enhance your experience at Devil Takes a Holiday.
            </p>
            <button onClick={handleAccept} className="accept-btn">
              Embrace the Temptation
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiePopup;
