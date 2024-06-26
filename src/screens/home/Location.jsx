import "../../styles/location.scss";
import { DevilChillin } from "../../components/SVGs"
import Map from "./Map";


const Location = () => {
    return (
        <section className="locationContainer" id="location">
            <div className="locationInfo">
                <div className="locationImage">
                    <DevilChillin />
                </div>
                <div className="locationAddress">
                    <h1 className="locationStreet">111 Saint Paul St.</h1>
                    <h2 className="locationCityState">Burlington, VT 05401</h2>
                    <div className="hoursContainer">
                        <Map />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;