import "../styles/footer.scss"
import InstagramIcon from "../images/instagram.png"
import MailIcon from "../images/mail.png"
import Reserve from "./Reserve"
import menuData from "../data/menu.json"
import { useState, useEffect } from "react";

const Footer = (props) => {
    const [menu, setMenu] = useState({});

    useEffect(() => {
        setMenu(menuData[0]);
    }, []);
    return (
        <div className="footerContainer">
            <div className="reserveSection">
                <h2>Thinking about a private event?</h2>
                <h1>Book Now!</h1>
                <Reserve showingNavigation={props.showingNavigation}/>
            </div>
            <div className="linksContainer">
                <a className="link" href="/#location" onClick={props.hideNavigation ? props.hideNavigation: null}>Location</a>
                <a className="link" href="/photos">Photos</a>
                <a className="link" href="/#drinks" onClick={props.hideNavigation ? props.hideNavigation: null}>Drinks</a>
                {
                    Object.keys(menu).map((drinkType) => {
                        return (
                            <>
                            {
                                drinkType === "Bits & Bobs" && (
                                    <a className="link" href="/#food" onClick={props.hideNavigation ? props.hideNavigation: null}>Food</a>
                                )
                            }
                            <a key={drinkType} className="link subLink" href={`/#${drinkType.split(" ")[0]}`} onClick={props.hideNavigation ? props.hideNavigation: null}>{drinkType}</a>
                            </>
                        );
                    })
                }
            </div>
            <div className="socialsContainer">
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/deviltakesaholiday/">
                    <img src={InstagramIcon} alt="Instagram"/>
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