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
                <a className="link subLink" href="#sinful" onClick={props.hideNavigation ? props.hideNavigation: null}>sinful summer sippers</a>
                <a className="link subLink" href="#devil's" onClick={props.hideNavigation ? props.hideNavigation: null}>devil's favorites</a>
                <a className="link subLink" href="#atonements" onClick={props.hideNavigation ? props.hideNavigation: null}>Atonements</a>
            </div>
            <div className="socialsContainer">
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/deviltakesaholiday/">
                    <img src={InstagramIcon} alt="Instagram"/>
                </a>
                <a target="_blank" rel="noreferrer" href="https://www.yelp.com">
                    <img src={YelpIcon} alt="Yelp"/>
                </a>
                <a target="_blank" rel="noreferrer" href = "mailto:HELLo@deviltakesaholiday.com">
                    <img src={MailIcon} alt="Mail"/>
                </a>
            </div>
            <div className="copywriteInfo">
                <p>© 2023 Devil Takes a Holiday</p>
            </div>
        </div>
    )
}

export default Footer;