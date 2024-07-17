import "../styles/footer.scss"
import InstagramIcon from "../images/instagram.png"
import MailIcon from "../images/mail.png"
// import Reserve from "./Reserve"
import { useState, useEffect } from "react";
import { getMenu } from "../utils/queries";


const Footer = (props) => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        getMenu().then((data) => {
            setMenu(data);
        });
    }, []);
    return (
        <div className="footerContainer">
            <div className="reserveSection">
                <h2>Thinking about a private event?</h2>
                <h1>Book Now!</h1>
                <a href="/reserve" className="learnMoreButton">Learn More</a>
            </div>
            <nav className="linksContainer">
                <a className="link" href="/" onClick={props.hideNavigation ? props.hideNavigation: null}>Home</a>
                <a className="link" href="/#location" onClick={props.hideNavigation ? props.hideNavigation: null}>Location</a>
                <a className="link" href="/photos">Photos</a>
                <a className="link" href="/artists">Artists</a>
                {
                    menu.length > 0 ? (
                        menu.map((singleMenu) => {
                            return (
                                <a key={singleMenu.id} className="link" href={`/#${singleMenu.title.split(" ")[0]}`} onClick={props.hideNavigation ? props.hideNavigation: null}>{singleMenu.title}</a>
                            );
                        })
                    ): null
                }
            </nav>
            <div className="socialsContainer">
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/deviltakesaholiday/">
                    <img src={InstagramIcon} alt="Instagram"/>
                </a>
                <a target="_blank" rel="noreferrer" href = "mailto:HELLo@deviltakesaholiday.com">
                    <img src={MailIcon} alt="Mail"/>
                </a>
            </div>
            <div className="copywriteInfo">
                <p>© 2024 Devil Takes a Holiday</p>
            </div>
        </div>
    )
}

export default Footer;