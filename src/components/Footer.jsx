import { DevilDrawing } from "./SVGs"
import "../styles/footer.scss"
import InstagramIcon from "../images/instagram.png"
import YelpIcon from "../images/yelp.png"
import MailIcon from "../images/mail.png"

const Footer = () => {
    return (
        <div className="footerContainer">
            <div className="svgContainer">
                <DevilDrawing />
            </div>
            <div className="linksContainer">
                <a href="#location">Location</a>
                <a href="#cocktails">Cocktails</a>
                <a href="#mocktails">Mocktails</a>
                <a href="#beer">Beer</a>
                <a href="#wine">Wine</a>
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