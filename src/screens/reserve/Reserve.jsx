import "../../styles/Reserve.scss"
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

    const handleReset = () => {
        setForm({
            date: "",
            time: "",
            length: 0,
            partySize: 0
        });
    }

    const handleSubmit = () => {
        if (!form.date || !form.time || form.length <= 0 || form.partySize <= 0) {
            alert("Please fill out all fields with valid information.");
            return;
        }

        const date = new Date(form.date);

        const [hours, minutes] = form.time.split(":").map(Number); // Split time into hours and minutes
        const suffix = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format, treating 0 as 12
        const timeString = `${formattedHours}:${minutes.toString().padStart(2, "0")} ${suffix}`
        
        const length = formatLength(form.length);
        // 2. Generate email text
        const emailBody = `
            Hello,
    
            Here are the details of the reservation request:
            - Date: ${date.toLocaleDateString()}
            - Time: ${timeString}
            - Length: ${length}
            - Party Size: ${form.partySize}
    
            Please let us know if you need any further information.
    
            Best regards,
            [Your Name]
        `.trim();
    
        // 3. Copy email text to clipboard
        navigator.clipboard.writeText(emailBody).then(() => {
            console.log("Email text copied to clipboard!");
        }).catch((err) => {
            console.error("Could not copy text to clipboard:", err);
        });
    
        // 4. Open email client
        const recipient = "HELLo@deviltakesaholiday.com";
        const emailSubject = encodeURIComponent("Reservation Request");
        const emailBodyEncoded = encodeURIComponent(emailBody);
        const mailtoLink = `mailto:${recipient}?subject=${emailSubject}&body=${emailBodyEncoded}`;
        window.location.href = mailtoLink;
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
    return (
        <main>
        <Navigation />
        <div className="reserveContainer">
            <div className="leftContainer">
                <h1>Book a Private Event</h1>
                <h2>Please provide the following in an email</h2>
                <form className="infoContainer" onSubmit={handleSubmit}>
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
                        <input type="time" name="time"id="time" list="start-time" value={form.time} onChange={handleChange}/>
                        <datalist id="start-time">
                            <option value="10:00">10:00</option>
                            <option value="10:30">10:30</option>
                            <option value="11:00">11:00</option>
                            <option value="11:30">11:30</option>
                            <option value="12:00">12:00</option>
                            <option value="12:30">12:30</option>
                            <option value="13:00">13:00</option>
                            <option value="13:30">13:30</option>
                            <option value="14:00">14:00</option>
                            <option value="14:30">14:30</option>
                            <option value="15:00">15:00</option>
                            <option value="15:30">15:30</option>
                            <option value="16:00">16:00</option>
                            <option value="16:30">16:30</option>
                            <option value="17:00">17:00</option>
                            <option value="17:30">17:30</option>
                            <option value="18:00">18:00</option>
                            <option value="18:30">18:30</option>
                            <option value="19:00">19:00</option>
                            <option value="19:30">19:30</option>
                            <option value="20:00">20:00</option>
                            <option value="20:30">20:30</option>
                            <option value="21:00">21:00</option>
                            <option value="21:30">21:30</option>
                            <option value="22:00">22:00</option>
                        </datalist>
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
                    <button type="button" 
                    className="submitButton"
                    onClick={handleReset}>Reset</button>
                </form>
            </div>
            <div className="rightContainer">
                <ImageScene />
            </div>
        </div>
        <Footer />
        </main>
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