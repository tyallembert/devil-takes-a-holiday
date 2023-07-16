import { useState } from "react";
import "../styles/navigation.scss";
import Footer from "./Footer";

const Navigation = () => {
    const [showing, setShowing] = useState(false);

    const toggleNavigation = () => {
        setShowing(!showing);
        console.log(showing);
    }
    return (
        <div className="navigationContainer">
            <button onClick={toggleNavigation} className={`navigationButton ${showing ? "showing": "hidden"}`}>
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
            </button>
            <div className={showing? "showingNav": "hidingNav"}>
                <Footer />
            </div>
        </div>
    )
}

export default Navigation;