import "../../styles/reserve.scss"
import {useState, useEffect} from "react"
import PeoplePNG from "../../images/people.png"
import CalendarPNG from "../../images/calendar.png"
import ClockPNG from "../../images/clock.png"
import { PalmTree } from "../../components/SVGs"
import Navigation from '../../components/Navigation';
import Footer from "../../components/Footer"

const Reserve = (props) => {
    // const [showing, setShowing] = useState(false)
    // const [animation, setAnimation] = useState(false)
    const [form, setForm] = useState({
        date: "",
        time: "",
        length: 0,
        partySize: 0
    })
    const [formVerified, setFormVerified] = useState({
        date: false,
        time: false,
        length: false,
        partySize: false
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => {
            return {...prevForm, [name]: value}
        })
    }

    useEffect(() => {
        const verifyForm = () => {
            setFormVerified({
                date: !!form.date,
                time: !!form.time,
                length: form.length !== 0,
                partySize: form.partySize !== 0
            });
        };
        verifyForm();
    }, [form]);

    const formatLength = (length) => {
        const hours = Math.floor(length/60);
        const minutes = length - hours*60;
        if(minutes === 0) {
            return `${hours} hours`;
        }
        return `${hours} hours ${minutes} minutes`;
    }

    // useEffect(() => {
    //     if(!props.showingNavigation) {
    //         setAnimation(false);
    //         setShowing(false);
    //     }
    // },[props.showingNavigation])

    // const toggleShowing = () => {
    //     setAnimation(!animation);
    //     if(showing) {
    //         setTimeout(() => {
    //             setShowing(false);
    //         }
    //         , 1000);
    //     }else {
    //         setShowing(true);
    //     }
    // }
    return (
        <>
        <Navigation />
        <div className="reserveContainer">
            <div className="leftContainer">
                <h1>Book a Private Event</h1>
                <h2>Please provide the following in an email</h2>
                <form className="infoContainer">
                    <div className={`itemContainer ${formVerified.date ? "verified": null}`}>
                        <label htmlFor="date">
                            <img className="imageIcon" src={CalendarPNG} alt="Calendar"/>
                            <p className="text">Date</p>
                        </label>
                        <input type="date" name="date" id="date" value={form.date} onChange={handleChange}/>
                    </div>
                    <div className={`itemContainer ${formVerified.time ? "verified": null}`}>
                        <label htmlFor="time">
                            <img className="imageIcon" src={ClockPNG} alt="Clock"/>
                            <p className="text">Start Time</p>
                        </label>
                        <input type="time" name="time"id="time" value={form.time} onChange={handleChange}/>
                    </div>
                    <div className={`itemContainer ${formVerified.length ? "verified": null}`}>
                        <label htmlFor="length">
                            <img className="imageIcon" src={ClockPNG} alt="Clock"/>
                            <p className="text">Length</p>
                        </label>
                        <p>{formatLength(form.length)}</p>
                        <input type="range" name="length" id="length" min={0} max={30*10} step={30} value={form.length} onChange={handleChange}/>
                    </div>
                    <div className={`itemContainer ${formVerified.partySize ? "verified": null}`}>
                        <label htmlFor="partySize">
                            <img className="imageIcon" src={PeoplePNG} alt="People"/>
                            <p className="text">Party Size</p>
                        </label>
                        <p>{form.partySize}</p>
                        <input type="range" name="partySize" id="partySize" min={1} max={40} step={1} value={form.partySize} onChange={handleChange}/>
                    </div>
                    <button type="submit" 
                    className="submitButton" 
                    disabled={formVerified.date && formVerified.time && formVerified.length && formVerified.partySize ? false: true}>Done</button>
                </form>
            </div>
            {/* <div className="leftContainer">
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
                    </div>
                </div>
            </div> */}
            <div className="rightContainer">
                <ImageScene />
            </div>
        </div>
        <Footer />
        </>
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