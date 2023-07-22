import "../styles/reserve.scss"
import {useState} from "react"
import PeoplePNG from "../images/people.png"
import CalendarPNG from "../images/calendar.png"
import ClockPNG from "../images/clock.png"

const Reserve = () => {
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing);
    }
    return (
        <div className="reserveContainer">
            <button className="learnMoreButton" onClick={toggleShowing}>Learn More</button>
            <div className={`reservePage ${showing ? "showing": "hidden"}`}>
                <div className="mainContainer">
                    <div className="leftContainer">
                        <h1>Book a Private Event</h1>
                        <h2>Please provide the following in an email</h2>
                        <div className="itemContainer">
                            <img className="imageIcon" src={CalendarPNG} alt="Calendar"/>
                            <p className="text">The <span>DATE</span> you would like to have the event</p>
                        </div>
                        <div className="itemContainer">
                            <img className="imageIcon" src={ClockPNG} alt="Clock"/>
                            <p className="text">The start <span>TIME</span> of the event</p>
                        </div>
                        <div className="itemContainer">
                            <img className="imageIcon" src={PeoplePNG} alt="People"/>
                            <p className="text">The <span>NUMBER</span> of <span>PEOPLE</span> that will be attending</p>
                        </div>
                        <div className="buttonsContainer">
                    <a className="learnMoreButton" 
                    onClick={toggleShowing}
                    href = "mailto:hello@deviltakesaholiday.com?Subject=Private%20Booking&Body=Message">Email Now</a>
                    <button className="learnMoreButton" onClick={toggleShowing}>Cancel</button>
                </div>
                    </div>
                    <div className="rightContainer">
                        <div className="imageContainer">
                            Image of inside the bar
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reserve;