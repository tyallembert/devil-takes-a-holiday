import { DevilDrawing } from "./SVGs"
import "../styles/footer.scss"
import InstagramIcon from "../images/instagram.png"
import YelpIcon from "../images/yelp.png"
import MailIcon from "../images/mail.png"

const Footer = () => {
    return (
        <div className="footerContainer">
            <div className="reserveContainer">
                <h2>Thinking about a private event?</h2>
                <h1>Reserve Now!</h1>
                <button className="learnMoreButton">Learn More</button>
            </div>
            <div className="linksContainer">
                <a className="link" href="#location">Location</a>
                <a className="link" href="#menu">Menu</a>
                <a className="link subLink" href="#cocktails">Cocktails</a>
                <a className="link subLink" href="#mocktails">Mocktails</a>
                <a className="link subLink" href="#beer">Beer</a>
                <a className="link subLink" href="#wine">Wine</a>
            </div>
            <div className="socialsContainer">
                <a href="instagram.com">
                    <img src={InstagramIcon} alt="Instagram"/>
                </a>
                <a href="yelp.com">
                    <img src={YelpIcon} alt="Instagram"/>
                </a>
                <a href="instagram.com">
                    <img src={MailIcon} alt="Instagram"/>
                </a>
            </div>
            <div className="copywriteInfo">
                <p>© 2023 Devil Takes a Holiday</p>
            </div>
        </div>
    )
}

export default Footer;