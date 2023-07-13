import "../styles/location.scss";
import { DevilChillin } from "./SVGs"


const Location = () => {

    return (
        <div className="locationContainer">
            {/* <h1 className="locationTitle">Location</h1> */}
            <div className="locationInfo">
                {/* <img className="locationImage" src={drinkIMG}/> */}
                <DevilChillin />
                <div className="locationAddress">
                    <h1 className="locationStreet">111 Saint Paul St.</h1>
                    <h2 className="locationCityState">Burlington, VT 05401</h2>
                    <div className="hoursContainer">
                        <div className="hours">Sunday - Thursday 3pm - 11pm</div>
                        <div className="hours">Friday & Saturday 3pm - 1am</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;