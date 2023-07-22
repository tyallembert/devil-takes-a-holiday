import "../styles/footer.scss"
import InstagramIcon from "../images/instagram.png"
import YelpIcon from "../images/yelp.png"
import MailIcon from "../images/mail.png"
import Reserve from "./Reserve"

const Footer = (props) => {
    return (
        <div className="footerContainer">
            <div className="reserveSection">
                <h2>Thinking about a private event?</h2>
                <h1>Book Now!</h1>
                <Reserve/>
            </div>
            <div className="linksContainer">
                <a className="link" href="#location" onClick={props.hideNavigation ? props.hideNavigation: null}>Location</a>
                <a className="link" href="#menu" onClick={props.hideNavigation ? props.hideNavigation: null}>Menu</a>
                <a className="link subLink" href="#cocktails" onClick={props.hideNavigation ? props.hideNavigation: null}>Cocktails</a>
                <a className="link subLink" href="#mocktails" onClick={props.hideNavigation ? props.hideNavigation: null}>Mocktails</a>
                <a className="link subLink" href="#beer" onClick={props.hideNavigation ? props.hideNavigation: null}>Beer</a>
                <a className="link subLink" href="#wine" onClick={props.hideNavigation ? props.hideNavigation: null}>Wine</a>
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