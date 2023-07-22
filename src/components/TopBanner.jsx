import "../styles/topBanner.scss";
import bannerData from "../data/top-banner.json";
import {useState} from "react";

const TopBanner = () => {
    const [banner] = useState(bannerData);
    return (
        <div className="topBannerContainer">
            <p>{banner.message}</p>
        </div>
    )
}

export default TopBanner;