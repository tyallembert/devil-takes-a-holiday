import "../styles/reserve.scss"
import {useState, useEffect} from "react"
import PeoplePNG from "../images/people.png"
import CalendarPNG from "../images/calendar.png"
import ClockPNG from "../images/clock.png"
import { PalmTree } from "./SVGs"

const Reserve = (props) => {
    const [showing, setShowing] = useState(false)
    const [animation, setAnimation] = useState(false)


    useEffect(() => {
        if(!props.showingNavigation) {
            setAnimation(false);
            setShowing(false);
        }
    },[props.showingNavigation])

    const toggleShowing = () => {
        setAnimation(!animation);
        if(showing) {
            setTimeout(() => {
                setShowing(false);
            }
            , 1000);
        }else {
            setShowing(true);
        }
    }
    return (
        <div className="reserveContainer">
            <button className="learnMoreButton" onClick={toggleShowing}>Learn More</button>
            <div className={`reservePage ${animation ? "showing": "hidden"}`}>
                {
                    showing ? (
                        <div className="mainContainer">
                            <div className="leftContainer">
                                <h1>Book a Private Event</h1>
                                <h2>Please provide the following in an email</h2>
                                <div className="infoContainer">
                                    <div className="itemContainer">
                                        <img className="imageIcon" src={CalendarPNG} alt="Calendar"/>
                                        <p className="text">The <span>DATE</span> you would like to have the event</p>
                                    </div>
                                    <div className="itemContainer">
                                        <img className="imageIcon" src={ClockPNG} alt="Clock"/>
                                        <p className="text">The <span>START TIME</span> and <span>LENGTH</span> of the event</p>
                                    </div>
                                    <div className="itemContainer">
                                        <img className="imageIcon" src={PeoplePNG} alt="People"/>
                                        <p className="text">The <span>NUMBER</span> of <span>PEOPLE</span> that will be attending</p>
                                    </div>
                                    <div className="buttonsContainer">
                                        <a className="learnMoreButton" 
                                        onClick={toggleShowing}
                                        href = "mailto:HELLo@deviltakesaholiday.com?Subject=Private%20Booking">Email Now</a>
                                        <button className="learnMoreButton" onClick={toggleShowing}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                            <div className="rightContainer">
                                <ImageScene />
                            </div>
                        </div>
                    ): null
                }
            </div>
        </div>
    )
}

export default Reserve;

const ImageScene = () => {
    return (
        <div className="imageSceneContainer">
            <PalmTree className="tree1"/>
            <PalmTree className="tree2"/>
            <PalmTree className="tree3"/>
            <PalmTree className="tree4"/>
        </div>
    )
}