import "../styles/footer.scss"
import InstagramIcon from "../images/instagram.png"
import MailIcon from "../images/mail.png"
import Reserve from "./Reserve"
import { useState, useEffect } from "react";

const Footer = (props) => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('/.netlify/functions/menu-get');
              if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              const jsonData = await response.json();
              console.log(jsonData);
              setMenu(jsonData);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
    }   
    , []);
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
                {
                    menu.map((singleMenu) => {
                        return (
                            <>
                            <a key={singleMenu.id} className="link" href={`/#${singleMenu.title.split(" ")[0]}`} onClick={props.hideNavigation ? props.hideNavigation: null}>{singleMenu.title}</a>
                            {
                                singleMenu.subMenus.map((subMenu) => {
                                    return (
                                        <a key={subMenu.id} className="link subLink" href={`/#${subMenu.title.split(" ")[0]}`} onClick={props.hideNavigation ? props.hideNavigation: null}>{subMenu.title}</a>
                                    );
                                })
                            }
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
                <p>© 2024 Devil Takes a Holiday</p>
            </div>
        </div>
    )
}

export default Footer;