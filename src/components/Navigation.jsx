import { useState } from "react";
import "../styles/navigation.scss";
import Footer from "./Footer";

const Navigation = () => {
    const [showing, setShowing] = useState(null);
    const whichPage = window.location.pathname;

    const toggleNavigation = () => {
        setShowing(!showing);
    }
    const hideNavigation = () => {
        setShowing(false);
    }
    return (
        <div className="navigationContainer">
            <div className={`navigation ${showing === true? "showingNav": showing === false ? "hidingNav": ''}`}>
                <Footer hideNavigation={hideNavigation} showingNavigation={showing}/>
            </div>
            <button onClick={toggleNavigation} className={`navigationButton 
            ${showing ? "showing": "hidden"} 
            ${whichPage === "/" ? 'delayAnimation': null}`}>
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
            </button>
        </div>
    )
}

export default Navigation;