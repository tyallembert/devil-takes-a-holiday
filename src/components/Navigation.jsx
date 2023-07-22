import { useState } from "react";
import "../styles/navigation.scss";
import Footer from "./Footer";

const Navigation = () => {
    const [showing, setShowing] = useState(false);

    const toggleNavigation = () => {
        setShowing(!showing);
    }
    const hideNavigation = () => {
        setShowing(false);
    }
    return (
        <div className="navigationContainer">
            <div className={showing? "showingNav": "hidingNav"}>
                <Footer hideNavigation={hideNavigation}/>
            </div>
            <button onClick={toggleNavigation} className={`navigationButton ${showing ? "showing": "hidden"}`}>
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
            </button>
        </div>
    )
}

export default Navigation;