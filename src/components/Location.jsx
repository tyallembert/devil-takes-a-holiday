// import { useEffect, useState } from "react";
import "../styles/location.scss";
import { DevilChillin } from "./SVGs"
import Map from "./Map";


const Location = () => {
    // const [hours] = useState([{day: "Sunday", hours: "3pm - 11pm"}, {day: "Monday", hours: "3pm - 11pm"}, {day: "Tuesday", hours: "3pm - 11pm"}, {day: "Wednesday", hours: "3pm - 11pm"}, {day: "Thursday", hours: "3pm - 11pm"}, {day: "Friday", hours: "3pm - 1am"}, {day: "Saturday", hours: "3pm - 1am"}])
    // const [today, setToday] = useState("");

    // useEffect(() => {
    //     checkWhichDay();
    // }, [])

    // const checkWhichDay = () => {
    //     const date = new Date();
    //     const day = date.getDay();
    //     switch (day) {
    //         case 0:
    //             setToday("Sunday");
    //             break;
    //         case 1:
    //             setToday("Monday");
    //             break;
    //         case 2:
    //             setToday("Tuesday");
    //             break;
    //         case 3:
    //             setToday("Wednesday");
    //             break;
    //         case 4:
    //             setToday("Thursday");
    //             break;
    //         case 5:
    //             setToday("Friday");
    //             break;
    //         case 6:
    //             setToday("Saturday");
    //             break;
    //         default:
    //             setToday("Sunday");
    //     }
    // }
    return (
        <div className="locationContainer" id="location">
            <div className="locationInfo">
                <DevilChillin />
                <div className="locationAddress">
                    <h1 className="locationStreet">111 Saint Paul St.</h1>
                    <h2 className="locationCityState">Burlington, VT 05401</h2>
                    <div className="hoursContainer">
                        <Map />
                        {/* {
                            hours.map((day, i) => {
                                return (
                                    <div key={i} className={`row ${day.day === today ? "activeDay": null}`}>
                                        <p className="day">{day.day}</p>
                                        <p className="hours">{day.hours}</p>
                                    </div>
                                )
                            })
                        } */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;